###  0. 确认打印信息

POST:  /API/order/verify

描述： 将用户选择的打印信息发到后端再次校验，并生成订单

post entity body

```js
{
  "pointID": String<Number>, // 打印点的唯一编号
  "files": [{ // Array<Object> 需打印的文件列表
    "fileID": String, // 文件 MD5 值
    "fileName": String, // 文件名
    "row": Number, // 多合一打印下每行几份
    "col": Number, // 多合一打印下每列几份
    "copies": Number, // 打印份数
    "size": String,   // 页面大小，如 "A4" "A3" 之类
    "caliper": String,// 纸张厚度，如 "70g" "80g" 等
    "color": String,  // 打印颜色模式， "mono"为黑白打印，"colorful"为彩色打印
    "side": Number, // 单双面设置，值为1是单面打印， 2为双面打印
    "startPage": Number, // 打印文档起始页
    "endPage": Number    // 打印文档终止页
  }],
  "money": Number, // 总共花费金额，后端需再校验
  "couponID": String<Number> || Null, // 优惠券ID, null 为没有使用优惠券
  "reduction": { // Object 折扣活动
    "newUser": Boolean || Number, // 新用户立减金额，false为新用户不减
    "full": Array<Array(2)> // 满减活动，每一项为[满多少, 减多少]
  },
  "dispatching": { // Object - 配送信息 全为空表示不配送
    "nickname": String, // 配送用户姓名
    "phone": String,// 用户手机号
    "address": String,  // 配送地址
    "message": String // 用户留言
  }
}

// example
{
  "pointID": "0026",
  "files": [{
    "fileID": "A52B4686E173B0612B71148F7F9E099A",
    "fileName": "申报指南.docx",
    "layout": 2,
    "copies": 1,
    "size": "A4",
    "caliper": "70g",
    "color": "mono",
    "side": 1,
    "startPage": 0,
    "endPage": 0
  }],
  "money": 25,
  "couponID": 0,
  "reduction": {
    "newUser": false,
    "full": []
  },
  "dispatching": {
    "nickname": "",
    "phone": "",
    "address": "",
    "message": ""
  }
}
```

Response:

> 校验成功时生成微信(支付宝)订单，并返回订单号

```js
{
  "result": "OK",
  "info": {
    "orderID": String, // 订单号
    "desc": String // 描述信息
  }
}

// example
{
  "result": "OK",
  "info": {
    "orderID": "201608123416576751519112",
    "desc": "《申报指南.docx》等共1个文件"
  }
}
```

### 1.获取订单详情

GET:  /API/order/detail

Parameters:

```js
orderID: 订单号
```

描述：获取订单详情信息，用于查询订单各种状态

Response:

> 获取订单成功则返回订单详情

```js
{
  "result": "OK",
  "info": {
    "id": String, // 订单号
    "orderSecret": String<Number>, // 订单 secret
    "orderCode": String<Number>, // 订单 secret code
    "pointType": String, // 所选打印点类型
    "auth": String, // 用户权限标识
    "status": "TOPAY", // 当前订单状态 将要支付"TOPAY"，正在支付"PAYING"，已支付"PAID"
    "money": Number, // 同第0点中相同字段
    "actualMoney": Number, // 实际需付金额
    "pageCount": Number, // 总共页数
    "orderDate": String<Number>, // 订单产生时间戳(毫秒)
    "payMethod": String, // 支付方式  微信"WXPAY" 或 支付宝"ALIPAY"
    "printDate": String<Number>,//支付时时间戳
    "uid": String, // 用户ID
    "username": String, // 用户名
    "phone": String<Number>,// 用户手机号
    "prePointID": String<Number>, // 同第0点中 pointId 字段
    "pointName": String, // 打印点名称,
    "printDate": String<Number>,// 打印时时间戳
    "actualPointID": String<Number>,// 实际执行打印的点的ID
    "actualPrintName": String,// 实际执行打印的点的名称
    "printItemCount": { // Object 打印项目计数
      "monoSingle": Number, // 黑白单页数量
      "monoDuplex": Number, // 黑白双面数量
      "colorfulSingle": Number,// 彩色单页数量
      "colorfulDuplex": Number // 彩色双面数量
    },
    "basicPrintItem": { // Objcet 基础打印计费
      "monoSingle": Number, // 黑白单页单价
      "monoDuplex": Number  // 黑白双面单价
    },
    "firstFileName": String, // 文件列表中第一个文件的名字
    "fileCount": Number, // 文件数量
    "files": [{ // Array<Object> 文件列表
      "fileID": String, // 同第0点中相同字段
      "fileName": String, // 同第0点中相同字段
      "direction": Boolean, // true 表示文档竖直排版，false为横板
      "layout": Number, // 同第0点中相同字段
      "color": String,  // 同第0点中相同字段
      "duplex": Number, // 同第0点中相同字段
      "copies": Number, // 同第0点中相同字段
      "canDownload": Boolean, // 是否可下载文件  true 表示可下载
      "startPage": Number, // 同第0点中相同字段
      "endPage": Number, // 同第0点中相同字段
      "downloadUrl": String // 文件下载地址URL
    }],
    "exp": Number, // 用户可获得经验值
    "coupon": Object || Null, // 优惠券信息
    "dispatchingInfo": Object || Null, // 配送信息
    "errSource": String, // 订单内部错误源
    "errMsg": String // 订单内部错误提示信息
  }
}

// example
{
  "result": "OK",
  "info": {
    "id": "201708172723119316581112",
    "orderSecret": "120717116541",
    "orderCode": "61320401",
    "pointType": "ATM",
    "auth": "2411fba29cd8cc72f1ad5a103037fdf9",
    "status": "TOPAY",
    "money": 10,
    "actualMoney": 10,
    "pageCount": 1,
    "orderDate": "1502983017322",
    "payMethod": "",
    "payDate": "",
    "uid": "9bc65f5a98bd0e36ef4bdf81",
    "username": "测试人",
    "phone": "189xxxx1234",
    "prePointID": "0001",
    "pointName": "综合楼大厅",
    "printDate": "",
    "actualPointID": "",
    "actualPointName": "",
    "printItemCount": {
      "monoSingle": 1,
      "monoDuplex": 0,
      "colorfulSingle": 0,
      "colorfulDuplex": 0
    },
    "basicPrintItem": {
      "monoSingle": 10,
      "monoDuplex": 15
    },
    "firstFileName": "申报指南.docx",
    "fileCount": 1,
    "files": [{
      "fileID": "3B052B46B7111286E48F7648F76E099A",
      "fileName": "申报指南.docx",
      "direction": true,
      "pageCount_source": 1,
      "pageCount_print": 1,
      "sideCount_print": 1,
      "layout": 1,
      "printMethod": "monoDuplex",
      "copies": 1,
      "canDownload": true,
      "startPage": 1,
      "endPage": 1,
      "downloadUrl": "/file/3B052B46B7111286E48F7648F76E099A.docx?OSSAccessKeyId=u0pANDsMY6yMrNPz&Expires=1502984817&Signature=t8TLCjeBp1kMqMRK4ZZVnHT8Gk4%3D"
    }],
    "exp": 24,
    "coupon": null,
    "dispatchingInfo": null,
    "errSource": "",
    "errMsg": ""
  }
}
```

