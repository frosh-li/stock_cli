const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StockSchema = new Schema({
  symbol: { type: String  },
  name: {type: String},
  current_year_percent: {type: Number}, // 全年涨跌幅
  percent: {type: Number},
  turnover_rate: {type: Number},
  followers: {type: Number},
  pb: {type: Number},
  market_capital: {type: Number}, //市值
  roe_ttm: {type: Number},
});

const Stock =  mongoose.model('Stock', StockSchema);
module.exports = Stock;