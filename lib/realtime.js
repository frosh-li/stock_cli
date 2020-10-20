// app.js
// 引入 events 模块
const { EventEmitter } = require('events');
const { fork } = require('child_process');
const {Stock, Single} = require('./mongo').model;
const { checkOnTimer } = require('../utils');
const mongo = require('./mongo');

class Realtime extends EventEmitter {
  constructor() {
    super();
    this.maxProcess = 10;
    this.subs = {};
    this.processes = {};
    this.mainStocks = [];
    this.forkSub();
    mongo.on('ready', this.run.bind(this));
  }

  /**
   * 启动子进程加速数据处理
   */
  forkSub() {
    const { maxProcess, subs, processes } = this;
    for(let i = 0 ; i < maxProcess ; i++) {
      let child = fork(__dirname + '/sub.js');
      child.on('message', (msg) => {
        if(msg.status === 'free') {
          subs[msg.pid] = {
            status: msg.status,
            child: child,
          };
    
          if(!processes[msg.pid]) {
            processes[msg.pid] = child;
          }
        }
    
        if(msg.status === 'busy') {
          subs[msg.pid] = {
            status: msg.status,
            child: child,
          };
        }
      })
    }
  }

  async run() {
    console.log('ready', mongo.model)
    // 获取换手率6%以上的股票
    const res = await Stock.find({turnover_rate: {$gte: 4}});
    const ret = await res;
    const stocks = ret.map(item => ({
      Code: item.symbol.substring(2), 
      Name: item.symbol,
      market_capital: item.market_capital,
    }));
    // console.log('stocks', stocks)
    this.mainStocks = [...stocks];
    console.log('总数量为', stocks.length);
    setTimeout(() => {
      if(checkOnTimer()) {
        this.startFork(stocks);
      }else{
        console.log('没到开盘时间');
        setTimeout(arguments.callee,1000);
      }
    }, 1000)
  }

  startFork(stocks) {
    const {processes, subs} = this;
    if(stocks.length === 0) {
      console.log('本轮已经结束');
      setTimeout(() => {
        if(checkOnTimer()) {
            this.startFork([...this.mainStocks]);
        }else{
          console.log('没到开盘时间');
          setTimeout(arguments.callee,60000);
        }
      }, 60000)
      return;
    }
    for(let key in subs) {
      if(subs[key].status === 'free') {
        const stock = stocks.shift();
        if(!stock) {
          break;
        }
        processes[key].send({...stock});
        break;
      }
    }
    setTimeout(() => {
      this.startFork(stocks);
    }, 10);
  }
}

new Realtime();