/**
 * 分析主升浪
 */
const moment = require("moment");
// 最终输出结果
let out = [];
// 生产对应的日期
let now = +new Date();
let fIndex = 0;
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
let singles, stocks;
MongoClient.connect(url,{ useNewUrlParser: true }, async (err, client) => {
    if (err) {
        return console.log("mongo 数据库连接失败", err);
    }
    console.log("数据库连接成功");
    this.db = client.db("stocks");
    singles = await this.db.collection("singles", { safe: true });
    stocks = await this.db.collection("stocks", { safe: true });
    Start();
});

async function getStockList() {
    let allStocks = await stocks.find({});
    let ret = await allStocks.toArray();

    return ret.map(item => {
        return {
            symbol: item.symbol,
            name: item.name
        };
    });
}

/**
 * 开始运行
 */
async function Start() {
    let allStocks = await getStockList();
    parse(allStocks);
}
now = +moment(now).subtract(0, "days");
async function parse(data) {
    let currentStock = data[fIndex];
    if (!currentStock) {
        console.log('所有的操作结束');
        out.sort((a, b) => {
            return a.turnoverrate > b.turnoverrate ? 1: -1
        }).forEach(item => {
            console.log('代码', item.symbol.symbol, '名称', item.symbol.name, '换手率', item.turnoverrate)
        })
        process.exit();
        return;
    }
    fIndex++;

    console.log("开始分析", currentStock.symbol, currentStock.name);
    let res = await singles
        .find({ symbol: currentStock.symbol, timestamp: { $lte: now } })
        .sort({ timestamp: -1 })
        .limit(5);
    let resArray = await res.toArray();
    if (resArray.length < 5) {
        await parse(data);
        return;
    }
    // 第一天跌 后三天涨 第5天跌 第六天涨
    if (
        resArray[3].percent > 1 && // 第三天上涨
        resArray[2].percent > 1 && // 第四天上涨
        resArray[1].percent > 1 && // 第五天下跌
        resArray[0].percent < 0    // 第六天上涨
        // resArray[3].vol > resArray[4].vol &&
        && resArray[2].vol > resArray[3].vol &&
        resArray[1].vol > resArray[2].vol &&
        resArray[0].vol < resArray[1].vol 
        // resArray[4].close < resArray[4].open &&
        // resArray[3].close > resArray[3].open &&
        // resArray[2].close > resArray[2].open &&
        // resArray[1].close > resArray[1].open &&
        // resArray[0].close < resArray[0].open
    ) {
        console.log("后天涨幅", currentStock, resArray[0].percent, new Date(resArray[0].timestamp));
        out.push({
            symbol: currentStock,
            turnoverrate: resArray[0].turnoverrate
            // percent: resArray[0].percent,
            // timestamp: new Date(resArray[0].timestamp)
        });
    }
    await parse(data);
}

Start();
