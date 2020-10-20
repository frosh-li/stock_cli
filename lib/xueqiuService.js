'use strict';

/**
 * 雪球页面
 */



class Xueqiu {

  constructor() {
    this.params = {
        page: 1,
        size: 30,
        order: 'desc',
        orderby: 'percent',
        order_by: 'percent',
        market: 'CN',
        type: 'sh_sz',
        _: +new Date()
    };
  }

  get url() {
    return 'https://xueqiu.com/service/v5/stock/screener/quote/list?';
  }

  get headers() {
    return {
      'User-Agent'                : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
      'Accept'                    : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Encoding'           : 'gzip, deflate, br',
      'Accept-Language'           : 'zh-CN,zh;q=0.9,en;q=0.8',
      'cache-control'             : 'max-age=0',
      'Connection'                : 'keep-alive',
      'Referer'                   : 'https://xueqiu.com/hq',
      'Host'                      : 'xueqiu.com',
      'Upgrade-Insecure-Requests' : 1
    };
  }

  get commonHeaders() {
    return {
      uri: this.getUrl(),
      method: 'get',
      dataType: "json",
      headers: {
        "User-Agent"        :"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36",
        'Accept'            : "*/*",
        "Accept-Encoding"   : "gzip, deflate, br",
        "Accept-Language"   : "zh-CN,zh;q=0.9,en;q=0.8",
        "cache-control"     : "no-cache",
        'Connection'        : "keep-alive",
        'Cookie'            :"device_id=c86dc338ed7bef666ee643eed3b96e3b; s=dz16deykcw; aliyungf_tc=AQAAADnbY1HU1A0AwLgicy9Nm13OMtYt; xq_a_token=1cc984adc2303728559a6e27619a64e70cc9595c; xq_a_token.sig=98ueT2_mrb1JCknQpk_31plcb4U; xq_r_token=4ec1b5e304a99d5775bfe43683b99aa1e0a3cb7b; xq_r_token.sig=3HywtnqINhq1Y7nGeqmDicJpZp8; u=261559827698299; Hm_lvt_1db88642e346389874251b5a1eded6e3=1559827698; Hm_lpvt_1db88642e346389874251b5a1eded6e3=1559829127",
        'Referer'           : "https://xueqiu.com/hq",
        'Host'              : "xueqiu.com",
        "X-Requested-With"  : "XMLHttpRequest",
      },
      gzip: true,
      json: true,
    }
  }

  getUrl() {
      return `${this.url}${this.buildParams()}`;
  }

  buildParams() {
      let ret = [];
      for (let key in this.params) {
          ret.push(`${key}=${this.params[key]}`);
      }
      return ret.join('&');
  }

  nextPage() {
      this.params.page++;
  }

  getUrlByPage(page) {
      this.params.page = page;
      return `${this.url}${this.buildParams()}`;
  }

  resetPage() {
      this.params.page = 1;
  }


}


module.exports = new Xueqiu();
