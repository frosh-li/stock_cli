'use strict';

/**
 * 雪球页面
 */



class Xueqiu {

  constructor() {
    this.params = {
        page: 1,
        size: 30,
        order: 'desc',
        orderby: 'percent',
        order_by: 'percent',
        market: 'CN',
        type: 'sh_sz',
        _: +new Date()
    };
  }

  get url() {
    return 'https://xueqiu.com/service/v5/stock/screener/quote/list?';
  }

  get headers() {
    return {
      'User-Agent'                : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
      'Accept'                    : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Encoding'           : 'gzip, deflate, br',
      'Accept-Language'           : 'zh-CN,zh;q=0.9,en;q=0.8',
      'cache-control'             : 'max-age=0',
      'Connection'                : 'keep-alive',
      'Referer'                   : 'https://xueqiu.com/hq',
      'Host'                      : 'xueqiu.com',
      'Upgrade-Insecure-Requests' : 1,
	  'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
	  'sec-ch-ua-mobile': '?0',
	  'Sec-Fetch-Dest': 'document',
	  'Sec-Fetch-Mode': 'navigate',
	  'Sec-Fetch-Site': 'none',
	  'Sec-Fetch-User': '?1',
    };
  }

  get commonHeaders() {
    return {
      uri: this.getUrl(),
      method: 'get',
      dataType: "json",
      headers: {
        "User-Agent"        :"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36",
        'Accept'            : "*/*",
        "Accept-Encoding"   : "gzip, deflate, br",
        "Accept-Language"   : "zh-CN,zh;q=0.9,en;q=0.8",
        "cache-control"     : "no-cache",
        'Connection'        : "keep-alive",
        'Cookie'            :"acw_tc=276082a416285616119411016eb692dda54bbe0d78ac8cf9022b2066cecc8a; s=bp1uev686n; xq_a_token=0de231800ecb3f75e824dc0a23866218ead61a8e; xq_r_token=55c21eea0ba3549a92f908d2f8ee69f0a03d067b; xq_id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1aWQiOi0xLCJpc3MiOiJ1YyIsImV4cCI6MTYzMDY5MDEwMSwiY3RtIjoxNjI4NTYxNjA5MTE0LCJjaWQiOiJkOWQwbjRBWnVwIn0.LZQyIXSblJRKgctS10fS78nINvS_ca8frdl2yRsM2dezOtxaIR5GezZAdMbq0SpPKllZIEktKC-89ZERit0cNvv1EyKFBowtBrkJhgCZqjA87vF9S1SreBuv4jbpXGq_nbRSwUZjMF4e0eemWxvb9okYQvE9wWHZObjv2uVnbLobmm8uWAByt-VDoNzBN4F05NNbFRwxlzFhU60ulEHleiowGkhxrGypflZX2anY-xVrCngQe0dmHimngTGlUSWZKbLHf3OsiA4XqVNnueTjBcRyaZacHWKLMKnYxi4PNBLdaoWVgTd6czu8RmjrOcfLGvVZt9PEH5D2ohJaKtxZxA; u=531628562176348; cookiesu=531628562176348; Hm_lvt_1db88642e346389874251b5a1eded6e3=1628562177; device_id=234826f5a40fffffcd93df9342fa5a90; Hm_lpvt_1db88642e346389874251b5a1eded6e3=1628562183",
        'Referer'           : "https://xueqiu.com/hq",
        'Host'              : "xueqiu.com",
        "X-Requested-With"  : "XMLHttpRequest",
	  'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
	  'sec-ch-ua-mobile': '?0',
	  'Sec-Fetch-Dest': 'empty',
	  'Sec-Fetch-Mode': 'cros',
	  'Sec-Fetch-Site': 'same-origin',
      },
      gzip: true,
      json: true,
    }
  }

  getUrl() {
      return `${this.url}${this.buildParams()}`;
  }

  buildParams() {
      let ret = [];
      for (let key in this.params) {
          ret.push(`${key}=${this.params[key]}`);
      }
      return ret.join('&');
  }

  nextPage() {
      this.params.page++;
  }

  getUrlByPage(page) {
      this.params.page = page;
      return `${this.url}${this.buildParams()}`;
  }

  resetPage() {
      this.params.page = 1;
  }


}


module.exports = new Xueqiu();
