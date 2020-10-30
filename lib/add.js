const request = require('request-promise-native');
const headers = {
  'Cookie'    :'em-quote-version=topspeed; intellpositionL=1492px; ct=TweEY9L5Ha5wEXu7KuDTfH05YWeWQzdV_7KyVgxy1Fygl18gbrbSkJQGXossE0eYSSogdTDR4mOrL6L8jpvObm28-MOySXS9hlJl0XwIZfL7Uqo_pLZeKOH7-C09M4M9adJobLba-V7Nn0ACLn22dn0KpNVKs70BxryoYTA2-OU; ut=FobyicMgeV5muwwBvHCVNyOtzx9P5Fn3Jai8REsEz_3_DtagvYE3kWBkM7U6WomG2yXfM3zTK8rZtsA_OxJkaoMmo5ba4gtE1UdXnT4_iscePIajS3sJ7_7zp8IVvBKewX-HAsPXke-hSHg1XQ5DTuuv2PxGKyB6oUJE5AZhVgPG-yHykfiOLrVSFPpv1p8ZU4v7gWmITJQNXVl922Go1pQCoGGwRCqmwINvsOr89Ef6K-6rqOIztNjYZRVFM3i4SCFfkiZoSqJrQE5UapnF7KCEx4vpA3Jl; pi=8548375522681702%3bd8548375522681702%3b%e7%82%92%e8%82%a1%e4%b8%8d%e4%ba%8f%e6%9c%ac%3boO7b%2bTuSiigXT%2byDckrbYAp6nSuLnLgFnEQ4ysitXwx8%2fYpSrLfoaDmCN2OItDBEYbORUOGKdozk9MG57qFxF361owjbQq8U7NYPi1WhkQspzIZXt6VgeX5%2b%2bj0SKoy9%2bD5JQsHlbJy8f2wjEGrfmCCWrC5pBEcncrBuqiz4ZexrGJprI2UaH7Ouf%2bHHor5AWH354kHl%3bKZGuDT2z6XrcKRt%2bMOV2QUbri%2f7uT4M0sTOjR0vnW2qUcjmAnEh%2fyYt48F4nLah0khRsAirxokaWB5sCe5dfsHb0viPUzaOfd4z0HwI%2bgUrB4YgAW%2f99mtAyYFX4rPOopuh%2fs0mTOuEcqBr%2bQ%2fhrAD8ydU5Uug%3d%3d; uidal=8548375522681702%e7%82%92%e8%82%a1%e4%b8%8d%e4%ba%8f%e6%9c%ac; sid=133019707; vtpst=%7c; _qddaz=QD.cg33yp.uvjfoh.ka8b4kgi; pgv_pvi=8658766848; em_hq_fls=old; emshistory=%5B%22%E8%B1%AB%E9%87%91%E5%88%9A%E7%9F%B3%22%2C%22ZMJ%22%2C%22%E4%B8%B9%E5%8C%96%E7%A7%91%E6%8A%80%22%2C%22JCGD%22%2C%22ZWGS%22%2C%22%E6%8D%A2%E6%89%8B%E7%8E%87%E5%A4%A7%E4%BA%8E6%25%E5%B9%B6%E8%B4%AD%E9%87%8D%E7%BB%84%E5%B9%B6%E8%B4%AD%E9%87%8D%E7%BB%84%22%2C%22%E6%8D%A2%E6%89%8B%E7%8E%87%E5%A4%A7%E4%BA%8E6%25%E5%B9%B6%E8%B4%AD%E9%87%8D%E7%BB%84%22%2C%22%E6%8D%A2%E6%89%8B%E7%8E%87%E5%A4%A7%E4%BA%8E6%25%E6%B8%A9%E5%92%8C%E6%94%BE%E9%87%8F%22%2C%22%E6%8D%A2%E6%89%8B%E7%8E%87%E5%A4%A7%E4%BA%8E6%25%22%2C%22%E6%8D%A2%E6%89%8B%E7%8E%87%E5%A4%A7%E4%BA%8E6%252020%E5%B9%B406%E6%9C%8817%E6%97%A5%22%2C%22SZGD%22%2C%22%E6%B9%98%E4%BD%B3%E8%82%A1%E4%BB%BD%22%2C%222020%E5%B9%B406%E6%9C%8817%E6%97%A5%E5%B9%B6%E4%B8%94%E6%B2%AA%E6%B7%B1%E5%B9%B6%E4%B8%94%E6%8D%A2%E6%89%8B%E7%8E%87%E5%A4%A7%E4%BA%8E6%22%2C%222020%E5%B9%B406%E6%9C%8817%E6%97%A5%E5%B9%B6%E4%B8%94%E6%B2%AA%E6%B7%B1%E5%B9%B6%E4%B8%94%E6%8D%A2%E6%89%8B%E7%8E%87%3E6%22%2C%222020%E5%B9%B406%E6%9C%8817%E6%97%A5%E6%B2%AA%E6%B7%B1%E5%B9%B6%E4%B8%94%E6%8D%A2%E6%89%8B%E7%8E%87%3E6%22%2C%22%E6%98%A8%E6%97%A5%E6%8D%A2%E6%89%8B%E7%8E%87%E5%A4%A7%E4%BA%8E6%25%E7%9A%84%E8%82%A1%E7%A5%A86%E6%9C%8810%E6%97%A5%22%2C%22%E6%98%A8%E6%97%A5%E6%8D%A2%E6%89%8B%E7%8E%87%E5%A4%A7%E4%BA%8E6%25%E7%9A%84%E8%82%A1%E7%A5%A8%22%2C%22%E4%B8%AD%E9%9D%92%E5%AE%9D6%E6%9C%8810%E6%97%A5%E8%B5%84%E9%87%91%E6%B5%81%E5%90%91%E5%9B%BE%22%2C%22%E9%B8%BF%E6%B3%89%E7%89%A9%E8%81%94%22%2C%22YDGF%22%5D; cowCookie=true; intellpositionT=455px; HAList=a-sz-300059-%u4E1C%u65B9%u8D22%u5BCC%2Ca-sz-300668-%u6770%u6069%u8BBE%u8BA1%2Ca-sz-300469-%u4FE1%u606F%u53D1%u5C55%2Ca-sz-300582-%u82F1%u98DE%u7279%2Ca-sz-300100-%u53CC%u6797%u80A1%u4EFD%2Ca-sz-300064-%u8C6B%u91D1%u521A%u77F3%2Ca-sz-300718-%u957F%u76DB%u8F74%u627F%2Ca-sz-300385-%u96EA%u6D6A%u73AF%u5883%2Ca-sz-300870-%u6B27%u9646%u901A%2Ca-sz-300063-%u5929%u9F99%u96C6%u56E2%2Ca-sz-300722-%u65B0%u4F59%u56FD%u79D1%2Ca-sh-600702-ST%u820D%u5F97; qgqp_b_id=ba8dd68e48d327f411cf467ba52e1626; st_si=01695631541070; st_pvi=68851343250135; st_sp=2020-04-19%2017%3A52%3A19; st_inirUrl=https%3A%2F%2Fwww.baidu.com%2Fs; st_sn=2; st_psi=20201030163501680-113200301712-3181179884; st_asi=20201030163501680-113200301712-3181179884-Web_so_ss-12',
  'Host'      :'myfavor.eastmoney.com',
  'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36',
  'Referer'   :'http://quote.eastmoney.com/',
};
const args = process.argv;
let stocks = args.slice(2);
console.log(stocks)
if(!stocks || stocks.length === 0) {
  return;
}
run(stocks);

function run(stocks) {
  const stock = stocks.shift();
  if(!stock) {
    console.log('所有添加完成')
    return;
  }
  if(!/[0-9]{6}/.test(stock)) {
    console.log('股票代码不正确', stock);
    addStocks(stocks);
  }
  addStock(stock);
}

async function addStock(stock) {
  const prefixCode = stock.substring(0,1) === '6' ? `1$${stock}`: `0$${stock}`;
  const url = `http://myfavor.eastmoney.com/v4/webouter/as?`
    + `appkey=d41d8cd98f00b204e9800998ecf8427e&g=6&`
    + `sc=${prefixCode}&_=${Date.now()}`;
  const res = await request(url, {
    json: true,
    headers: headers,
  });
  if(res.state === 0) {
    console.log('新增股票成功', prefixCode);
  }else{
    console.log(prefixCode, res.message);
  }
  run(stocks);
}