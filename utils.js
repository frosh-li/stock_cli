const moment = require('moment');
/**
 * 检查是否在开盘时间内
 */
function checkOnTimer() {
  const hours = moment().hours();
  const minute = moment().minute();
  console.log('当前时间', hours, '时', minute, '分');
  if(
    (hours === 9 && minute >= 30) //9点30正式开盘
    ||
    (hours === 10)
    ||
    (hours === 11 && minute <= 30)
    ||
    (hours >= 13 && hours < 15)
   ) {
     return true;
   }
  return false;
}

module.exports = {
  checkOnTimer,
};