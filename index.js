const { program } = require('commander');

program
  .version('0.1.0')
  .command('craw', '收盘后抓取数据', { executableFile: './lib/craw' })
  .command('realtime', '实时推送资金数据', {isDefault: true, executableFile: './lib/realtime'})

program.parse(process.argv);