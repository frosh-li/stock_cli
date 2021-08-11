const moment = require('moment');
/**
 * 检查是否在开盘时间内
 */
function checkOnTimer() {
  const hours = moment().hours();
  const minute = moment().minute();
  const weekOfDay = moment().format("E");
  console.log('当前时间',"星期", weekOfDay, hours, '时', minute, '分');
  if(weekOfDay === 6 || weekOfDay === 7) {
	return false;
  }
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
