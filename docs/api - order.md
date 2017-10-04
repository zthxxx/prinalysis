# 订单相关 API 说明

##  0. 确认打印信息

POST:  /API/order/verify

描述： 将用户选择的打印信息发到后端再次校验，并生成订单

post entity body

```js
{
  "pointID": String<Number>, // 打印点的唯一编号
  "money": Number, // 总共花费金额，后端需再校验
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
  "money": 25,
  "files": [{
    "fileID": "A52B4686E173B0612B71148F7F9E099A",
    "fileName": "申报指南.docx",
    "row": 1, 
    "col": 2,
    "copies": 1,
    "size": "A4",
    "caliper": "70g",
    "color": "mono",
    "side": 1,
    "startPage": 0,
    "endPage": 0
  }],
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
    "orderID": String, // 用于获取表单、二维码、以及轮询状态订单号
    "desc": String // 用于向用户显示的描述信息
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

## 1. 获取订单详情

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
    "uid": String, // 下单用户 ID
    "username": String, // 下单用户名
    "nickname": String, // 下单用户姓名昵称
    "orderID": String, // 订单号
    "orderDate": Date, // 订单产生时间戳
    "state": String,   // 当前订单交易状态，同支付 API 第 2 点 state 字段
    "payWay": String,  // 支付方式，微信 "WXPAY" 或 支付宝 "ALIPAY"
    "payDate": Date,   // 【可选】支付时间戳，未支付则无此项或此项为 null
    "pointName": String, // 所选打印点名称
    "printDate": Date,   // 【可选】打印时间戳，未打印则无此项或此项为 null
    "pointID": String,   // 所选打印点 ID
    "money": Number,     // 总共花费金额，同第 0 点 money 字段
    "files": [{ // Array<Object> 文件列表
      "fileID": String, // 文件 MD5 值，同第 0 点中 fileID 字段
      "fileName": String, // 文件名，同第 0 点中相同字段
      "row": Number, // 同第 0 点中相同字段
      "col": Number, // 同第 0 点中相同字段
      "copies": Number, // 同第 0 点中相同字段
      "size": Number, // 同第 0 点中相同字段
      "caliper": String,// 同第 0 点中相同字段
      "color": String,  // 同第 0 点中相同字段
      "startPage": Number, // 同第 0 点中相同字段
      "side": Number, // 同第 0 点中相同字段
      "endPage": Number, // 同第 0 点中相同字段
      "downloadable": Boolean, // 是否可下载文件  true 表示可下载
      "downloadUrl": String // 【可选】文件下载地址URL
    }],
    "dispatching": { // 【可选】配送信息，无此项或此项字段全为 null 则表示自取不配送
      "nickname": String, // 同第 0 点中相同字段
      "phone": String,// 同第 0 点中相同字段
      "address": String,  // 同第 0 点中相同字段
      "message": String // 同第 0 点中相同字段
    },
    "settle": [{ // Array<Object> 计费条目信息，应与 files 字段数据能对应
      "size": Number, // 纸张大小，同第 0 点中相同字段
      "caliper": String,// 纸张厚度，同第 0 点中相同字段
      "color": String,  // 颜色模式，同第 0 点中相同字段
      "side": Number, // 单双面
      "unit": Number, // 单价金额
      "count": Number // 该条目打印数量
    }]
  }
}

// example
{
  "result": "OK",
  "info": {
    "uid": "1fba29cd8cc72f1ad",
    "username": "18945678900",
    "nickname": "xxx",
    "orderID": "2017081527671193112",
    "orderDate": "1507110204020", // 订单产生时间戳
    "state": "PAID",
    "payWay": "ALIPAY",
    "payDate": "1507110422525",
    "pointName": "第一打印点",
    "printDate": "1507110452525",
    "pointID": "0026",
    "money": 80,
    "files": [{
      "fileID": "3B052B46B7111286E48F7648F76E099A",
      "fileName": "保养指南.docx",
      "row": 1,
      "col": 2,
      "copies": 1,
      "size": "A4",
      "caliper": "70g",
      "color": "colorful",
      "side": 2
      "startPage": 2,
      "endPage": 4,
      "downloadable": false, // 是否可下载文件  true 表示可下载
    }],
    "settle": [
      {
        "size": "A4", // 纸张大小，同第 0 点中相同字段
        "caliper": "70g",// 纸张厚度，同第 0 点中相同字段
        "color": "colorful",  // 颜色模式，同第 0 点中相同字段
        "side": 2, // 单双面
        "unit": 50, // 单价金额
        "count": 1 // 该条目打印数量
      },
      {
        "size": "A4", // 纸张大小，同第 0 点中相同字段
        "caliper": "70g",// 纸张厚度，同第 0 点中相同字段
        "color": "colorful",  // 颜色模式，同第 0 点中相同字段
        "side": 1, // 单双面
        "unit": 30, // 单价金额
        "count": 1 // 该条目打印数量
      }
    ]
  }
}
```

