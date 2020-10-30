awk  '{print $4}' 2020-10-15  |sort |   uniq -c | sort -g

某一个股票的列表

http://myfavor.eastmoney.com/v4/webouter/gstkinfos?appkey=d41d8cd98f00b204e9800998ecf8427e&cb=jQuery331015536722455693308_1604047818692&g=6&_=1604047818696


jQuery331015536722455693308_1604047818692({"state":0,"message":"成功","data":{"stkinfolist":[{"security":"0$300100$23306950814966","star":false,"updatetime":20201030165016,"price":"15.62"},{"security":"1$688001$24371072792603","star":false,"updatetime":20201030164628,"price":"42.18"}]}});

新增一个股票倒某个列表中
http://myfavor.eastmoney.com/v4/webouter/as?appkey=d41d8cd98f00b204e9800998ecf8427e&cb=jQuery331015536722455693308_1604047818690&g=6&sc=1%24600704&_=1604047818738

jQuery331015536722455693308_1604047818690({"state":0,"message":"成功","data":{"gid":"6","gname":"当天股票","fromclient":"web","ver":13}});

删除股票
http://myfavor.eastmoney.com/v4/webouter/dslot?appkey=d41d8cd98f00b204e9800998ecf8427e&cb=jQuery331015536722455693308_1604047818688&g=6&scs=0%24300100%2C1%24688001&_=1604047818745

appkey: d41d8cd98f00b204e9800998ecf8427e
cb: jQuery331015536722455693308_1604047818688
g: 6
scs: 0$300100,1$688001
_: 1604047818745