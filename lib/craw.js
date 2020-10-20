const mongo = require('./mongo');
const CrawService = require('./crawService');

class Craw {
  constructor() {
    mongo.on('ready', this.run.bind(this));
  }  

  /**
   * 清理旧数据
   */
  async clearMongo() {
    const { Stock, Single } = mongo.model;
    await Stock.remove({});
    await Single.remove({});
  }

  /**
   * 开始抓取数据
   */
  async run() {
    console.log('开始抓取');
    await this.clearMongo();
    console.log('数据清理完成');
    (new CrawService()).startCrawAllStock();
  }
}

new Craw();