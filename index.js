const { program } = require('commander');

program
  .version('0.1.0')
  .command('craw', '收盘后抓取数据', { executableFile: './lib/craw' })
  .command('realtime', '实时推送资金数据', {isDefault: true, executableFile: './lib/realtime'})
  .command('parse', '收盘后分析一涨三跌模型', {executableFile: './lib/parse'})
  .command('add', '增加股票到特定分组中', {executableFile: './lib/add'})

program.parse(process.argv);
