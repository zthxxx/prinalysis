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
```

```js
// verify request param example
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
```

```js
// response example
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

```js
/**
 * @param {string} state - 订单状态，有 7 种定义，包含支付的交易状态
 * "PAYING"  未支付，正在等待支付
 * "PAID"    已完成支付，但未打印，正在等待打印
 * "PRINTED" 已完成打印，但未取件，等待配送或取件
 * "FINISH"  完成取件
 * "CANCEL"  取消订单（已支付的订单不可取消）
 * "REFUNDING" 正在退款（已打印的订单不可退款）
 * "REFUNDED" 已退款
 */
```

```js
/**
 * 订单详细信息对象
 * @typedef OrderDetail
 * @type {object}
 */
{
  "uid": String, // 下单用户 ID
  "username": String, // 下单用户名
  "nickname": String, // 下单用户姓名昵称
  "orderID": String, // 订单号
  "orderDate": Date, // 订单产生时间戳
  "state": String,   // 如上定义的当前订单交易状态
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
```
Response:

> 获取订单成功则返回订单详情

```js
{
  "result": "OK",
  "info": OrderDetail // 订单详细信息对象
}
```

```js
// order detail response example
{
  "result": "OK",
  "info": {
    "uid": "1fba29cd8cc72f1ad",
    "username": "18945678900",
    "nickname": "xxx",
    "orderID": "2017081527671193112",
    "orderDate": "1507110204020",
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
      "side": 2,
      "startPage": 2,
      "endPage": 4,
      "downloadable": false
    }],
    "settle": [
      {
        "size": "A4",
        "caliper": "70g",
        "color": "colorful",
        "side": 2,
        "unit": 50,
        "count": 1
      },
      {
        "size": "A4",
        "caliper": "70g",
        "color": "colorful",
        "side": 1,
        "unit": 30,
        "count": 1
      }
    ]
  }
}
```

## 2. 获取订单简要信息列表

GET:  /API/orders/info

Parameters:

```js
limits: Number // 查询列表分页中限制每页的最大条数
page: Number // 表示查询第几分页，从 1 开始
type: String // 表示限制查询某种状态类型的订单，具体状态如下
/**
 * 查询的 type 有 6 种类型，包含第 1 点中定义的状态，但多一种类型 ALL
 * "ALL"     表示所有查询状态的订单
 * "PAYING"  同第 1 点 state 中定义的相同字段
 * "PAID"    同第 1 点 state 中定义的相同字段
 * "PRINTED" 同第 1 点 state 中定义的相同字段
 * "FINISH"  包括同第 1 点 state 中定义的 FINISH 和 CANCEL
 * "REFUND"  包括同第 1 点 state 中定义的 REFUNDING 和 REFUNDED
 */
```

描述：获取简要信息的订单列表，用于展示基本订单列表

Response:

> 获取订单成功则返回订单详情

```js
/**
 * 订单基本信息对象
 * @typedef OrderBase
 * @type {object}
 */
{
  "orderID": String,   // 同第 1 点 OrderDetail 相同字段
  "orderDate": Date,   // 同第 1 点 OrderDetail 相同字段
  "state": String,     // 同第 1 点 state 定义
  "money": Number,     // 同第 1 点 OrderDetail 相同字段
  "pointName": String, // 同第 1 点 OrderDetail 相同字段
  "fileCount": Number, // 该订单包含文件数
  "filePrename": String // 任一一项文件名
}
```

```js
{
  "result": "OK",
  "info": Array<OrderBase> // 订单基本信息列表
}
```

```js
// orders info response example
{
  "result": "OK",
  "info": [{
    "orderID": "2017081527671193112",
    "orderDate": "1507110204020",
    "state": "PAID",
    "money": 50,
    "pointName": "第一打印点"
    "fileCount": 2,
    "filePrename": "保养指南.docx"
  }]
}
```

## 3. 获取订单状态汇总统计

GET:  /API/orders/amount

描述：用于获取不同状态所有订单数量的统计

Response:

> 获取成功则返回不同状态的统计数量

```js
{
  "result": "OK",
  "info": {
    "ALL": Number, // 该项状态中订单的数量，以下类型均同第 2 点中 type
    "PAYING": Number,
    "PAID": Number, 
    "PRINTED": Number, 
    "FINISH": Number, 
    "REFUND": Number
  }
}
```

## 4. 各项状态间对应范围关系

```
    
    trade        order/detail    orders/info query 
+-------------+ +------------+ +----------+-------+
|  PAYING     | |  PAYING    | |  PAYING  |       |
+-------------+ +------------+ +----------+       |
|  PAID       | |  PAID      | |  PAID    |       |
|             | +------------+ +----------+       |
|             | |  PRINTED   | |  PRINTED |       |
|             | +------------+ +----------+       |
|             | |  FINISH    | |  FINISH  |  ALL  |
+-------------+ +------------+ |          |       |
|  CANCEL     | |  CANCEL    | |          |       |
+-------------+ +------------+ +----------+       |
|  REFUNDING  | |  REFUNDING | |  REFUND  |       |
+-------------+ +------------+ |          |       |
|  REFUNDED   | |  REFUNDED  | |          |       |
+-------------+ +------------+ +----------+-------+
```

