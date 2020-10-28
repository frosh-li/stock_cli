"use strict";
const rp = require('request-promise-native');
const moment = require('moment');
const xueqiuService = require('./xueqiuService');
const mongo = require('./mongo');
/**
 * 真实抓取流程
 */
class CrawService {
  constructor(ctx) {
    this.total = 0;
    this.headers = xueqiuService.headers;
    this.cookiejar = null;
  }

  get currentCookie() {
    return "device_id=c86dc338ed7bef666ee643eed3b96e3b; s=dz16deykcw;" + this.cookiejar.getCookieString("https://stock.xueqiu.com");
  }

  async startCrawAllStock() {
    const xueqiu = xueqiuService;
    console.log(`开始抓取第${xueqiu.params.page}页`);
    
    const url = xueqiu.getUrl();
    let options = xueqiu.commonHeaders;
    let body = await rp(url, options);
    console.log(body)
    if (body.error_code !== 0) {
      console.log("request error", url, body);
    } else {
      this.save(body.data.list);
    }
  }

  async save(data) {
    const { Stock, Single } = mongo.model;
    console.log(data);
    if (data.length === 0) {
      console.log("all stocks", this.allStocks);
      this.CrawSingle();
      return;
    }
    data = data.map((item) => {
      return {
        ...item,
        symbol: item.symbol,
        name: item.name,
      };
    }).filter((item) => {
      return item.symbol.substring(2,4) !== '17'
    });
    await Stock.insertMany(data);
    const xueqiu = xueqiuService;
    xueqiu.nextPage();
    this.startCrawAllStock();
  }

  async CrawSingle() {
    const { Stock, Single } = mongo.model;
    const data = await Stock.find({});
    console.log('data', data)
    this.total = data.length;
    this.RunCraw(data);
  }

  async RunCraw(data) {
    this.cookiejar = rp.jar();
    let res = await rp({
      uri: "https://stock.xueqiu.com",
      resolveWithFullResponse: true, //  <---  <---  <---  <---
      headers: this.headers,
      gzip: true,
      jar: this.cookiejar,
    });
    console.log(res.headers["set-cookie"]);
    this.headers["Host"] = "stock.xueqiu.com";
    this.headers.Cookie = this.currentCookie;
    delete this.headers.Referer;
    console.log(this.headers);

    this.startCraw(data);
  }

  async startCraw(data) {
    const { Stock, Single } = mongo.model;
    let item = data.shift();
    if (!item) {
      console.log("所有的爬取结束");
      return;
    }
    console.log("start at", item.symbol);

    let today = +moment()
      .add(1, "day")
      .hours(0)
      .minutes(0)
      .seconds(0)
      .milliseconds(0);
    let url = `https://stock.xueqiu.com/v5/stock/chart/kline.json?symbol=${item.symbol}&begin=${today}&period=day&type=before&count=-100&indicator=kline`;
    let options = {
      uri: url,
      json: true,
      headers: this.headers,
      //   resolveWithFullResponse: true,
      gzip: true,
      jar: this.cookiejar,
    };
    console.log(url);
    let body;
    try {
      body = await rp(options);
    } catch (e) {
      console.log("获取数据出错，重试");
      body = await rp(options);
    }
    this.headers.Cookie = this.currentCookie;
    if (body) {
    
      var tmp1 = [];
      body.data.item.forEach((citem) => {
        tmp1.push({
          symbol: body.data.symbol,
          timestamp: citem[0],
          vol: citem[1],
          open: citem[2],
          high: citem[3],
          low: citem[4],
          close: citem[5],
          percent: citem[7],
          pb: citem[13],
          turnoverrate: citem[8], // 换手率
        });
      });
      console.log(body.data.symbol, "获取记录数", tmp1.length);
      await Single.insertMany(tmp1);
      console.log("插入成功", body.data.symbol);
    }
    setTimeout(() => {
      this.startCraw(data);
    }, 10);
  }
}

module.exports = CrawService;
