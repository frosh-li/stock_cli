const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SingleSchema = new Schema({
  symbol: { type: String  },
  timestamp: { type: String  },
  vol: {type: Number},
  open: {type: Number},
  high: {type: Number},
  low: {type: Number},
  close: {type: Number},
  percent: {type: Number},
  turnoverrate: {type: Number},
});
SingleSchema.index({
  timestamp: 1,
  symbol: 1,
})

const Single = mongoose.model('Single', SingleSchema);
module.exports = Single;