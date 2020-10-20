const mongoose = require('mongoose');
const Stock = require('./model/stock');
const Single = require('./model/single');
const EventEmitter = require('events').EventEmitter; 

class MongoClient extends EventEmitter {
  constructor() {
    super();
    this.init();
    this.model = {
      Stock,
      Single,
    }
  }

  async init() {
    try {
      await mongoose.connect('mongodb://localhost:27017/stocks', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      });
      this.emit('ready');
    }catch(e) {
      console.log(e);
    }
  }
}

module.exports = new MongoClient();