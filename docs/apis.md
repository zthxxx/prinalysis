# 云打印前端 API 需求说明

【注】以下 `/API/` 为地址前缀，应由真实地址替换。金额数值处理（即API中表示金额的数值）均以人民币`分`为单位，前端显示金额（无关API）均以`元`为单位。

本 API 说明文档风格参考 [GitHub API](https://developer.github.com/v3/apps/) 。

[TOC]

### 0. 统一错误请求返回

描述：在API请求失败或**错误**时返回内容

> `result` 统一为 `ERROR`，`message` 内容为**显示给用户看**的提示信息。

Response:

```js
{
  "result": "ERROR", // ERROR 大写
  "message": "xxxx"
}
```

【注】基本响应固定格式为：  如果 `result` 是 `ERROR`，那么就有个 `message` 错误消息用于直接给用户看错误提示，如果 `result` 为 `OK`，那么就有个 `info` 字段内包含前端请求需要获取的各项属性信息；
如果 `result` 不为以上两者的，比如 `EXISTED`，那么响应内的属性格式也不属于以上基本格式，根据请求而定。

### 1. 获取校园地址

GET:  /API/point/address

描述：用于获得打印点所在的可选位置

Response:

> 正确响应时，`Info` 中包含三层相互嵌套的地址，每层同级地址组成一个数组，同一层中的地址表示为键值对，键为地址名，值为子层地址组；最终层键值对没有子级地址，其值应为表示次具体地址的 ID。

```js
{
  "result": "OK", // OK 大写
  "info": [{
    key: [{
      key: [{
        key: id
      }]
    }]
  }]
}

// example
{
  "result": "OK",
  "info": [
    {
      "一级地址 城市1": [
        {
          "二级地址 学校1": [{"三级地址 校区1": "ID"}, {"三级地址 校区2": "ID"}]
        },
        {
          "二级地址 学校2": [{"三级地址 校区1": "ID"}]
        }
      ]
    },
    {
      "一级地址 城市2": [
        {
          "二级地址 学校1": [{"三级地址 校区1": "ID"}]
        },
        {
          "二级地址 学校2": [{"三级地址 校区1": "ID"}, {"三级地址 校区2": "ID"}]
        }
      ]
    }
  ]
}
```

### 2. 获取打印点信息

GET:  /API/point/points

Parameters:

```js
ID: String   // 表示具体地点的 ID

// example
/API/point/points?ID=xxx
```

描述： 用于查询指定地址下所有打印点所支持的打印类型价格等的信息，指定地址为三个参数确定

Response:

> 查询为空时返回 EMPTY， `Info` 应为空数组

```js
{"result":"EMPTY","info":[]}
```

> 查询成功时，返回包含打印点信息的集合

```js
{
  "result": "OK",
  "info": Array<POINT Object>
}
```

POINT Object 字段说明

|     Field      |      Type       |                Descprite                 |           Example           |
| :------------: | :-------------: | :--------------------------------------: | :-------------------------: |
|       id       | String<Number>  |           每个打印点的唯一编号，数值或数值的字符串           |           "0001"            |
|     status     |     String      |    表示打印点当前状态，运行还是休息或维护，"RUNNING" 为运行     | "RUNNING", "SUMMER_HOLIDAY" |
|   pointType    |  Array<String>  | 标识打印点的类型，ATM机器，或者门店，或者都有, "ATM"为机器，"DISPATCHING"为门店 |   ["ATM", "DISPATCHING"]    |
| delivery_scope |     String      |            显示的配送范围，为空表示不支持配送             |        "", "软件园C、E区"        |
| delivery_time  |     String      |                 显示的配送时间                  |       "每天中午十二点到下午六点"        |
|     phone      | String<Number>  |                该点负责人联系手机号                |        "189xxxx1234"        |
|   pointName    |     String      |                 显示的打印点名字                 |           "示例打印点"           |
|    address     |     String      |                  显示详细地址                  |          "综合楼进门左转"          |
|    message     |     String      |               关于优惠、活动的宣传语                |         "欢迎使用云打印~"          |
|     image      |     String      |        打印点的展示图 URL，不特殊指定就是ATM.jpg        |       "/img/ATM.jpg"        |
|    takeTime    |  Array<Number>  |      自主取件时间范围，24h，[起始时,起始分,终止时,终止分]      |      [10, 30, 18, 30]       |
|     price      | <price Object>  |             打印类型支持与价格（详述见下）              |                             |
|    atmInfo     |     Object      |                 打印点的机子信息                 |                             |
|                |     Number      |           maxPageCount: 最大打印页数           |             500             |
|                |     String      |               desc: 详细描述信息               |             ""              |
|    dispatch    |     Object      |                   配送信息                   |                             |
|                |     Number      |           maxPageCount: 最大配送页数           |             500             |
|                |     Number      |    distributionStart: 起送费用, 300即3元起送     |             300             |
|                |     Number      |         distributionCharge: 配送费用         |             200             |
|                |     String      |               desc: 详细描述信息               |             ""              |
|   minCharge    |     Number      |                 该点每次最小花费                 |              0              |
|   reduction    |     Object      |                 支持的活动优惠                  |                             |
|                |     Boolean     |           withCoupon: 是否支持优惠券            |            true             |
|                |     Number      |             newUser: 新用户立减花费             |             50              |
|                |     Boolean     |           redPacket: 是否支持抢红包优惠           |            false            |
|                | Array<Array(2)> |     full: [满多少, 减多少]活动，如满10减3，满20减9      | [[2000, 300], [5000, 800]]  |
|                |  Array<String>  |            activity: 正在进行的活动             |             []              |


```js
/** price Array<Object> 详细项
* 表示所支持的每种打印类型对应单价
* 每种打印类型由四种属性组成：页面大小，页面厚度，颜色模式，单双面
* price Array 中的 Object 按纸张固有属性(大小厚度)分类，每个 Object 描述的纸张属性不应重复
* Object 中再用 "money" 键表示打印模式对应单价，打印模式为颜色和面数嵌套的描述方式。
* {
*   "size": 页面大小,
*   "caliper": 纸张厚度(纸张厚度用克表示)
*   "money": {
*     颜色模式: {
*       单双面: 价格
*     }
*   }
* }
* 纸张固有属性有页面大小，页面厚度，两者不能缺少
* 页面大小有 "A4" "A3" "B3" "B5" 等
* 页面厚度有 "70g" "80g" "120g" 等
* 打印模式有颜色和面数，每一项均为可选，如缺少某一大小或某一厚度，则表示不支持此类型
* 颜色模式 "mono" 表示黑白打印，"colorful" 表示彩色打印
* 单双面选项 "oneside" 表示单面打印，"duplex" 表示双面打印
*/
// price Array<Object> example
"price": [
  {
    "size": "A4",
    "caliper": "70g",
    "money": {
      "mono": {
        "oneside": 10,
        "duplex": 15
      },
      "colorful": {
        "oneside": 20,
        "duplex": 30
      }
    }
  },
  {
    "size": "A4",
    "caliper": "80g",
    "money": {
      "mono": {
        "oneside": 20,
        "duplex": 25
      }
    }
  },
  {
    "size": "A3",
    "caliper": "70g",
    "money": {
      "colorful": {
        "oneside": 30,
        "duplex": 40
      }
    }
  }
]
```

```js
// POINT Object example
{
  "id": "0001",
  "status": "SUMMER_HOLIDAY",
  "pointType": ["ATM"],
  "delivery_scope": "",
  "delivery_time": "每天中午十二点到两点，每天晚上8点到10点",
  "phone": "189xxxx1234",
  "pointName": "示例打印点",
  "address": "综合楼进门左转",
  "message": "欢迎使用云打印~",
  "image": "/assets/img/print/ATM.jpg",
  "takeTime": [10, 30, 18, 30],
  "price": [{
    "size": "A4",
    "caliper": "70g",
    "money": {
      "mono": {
        "oneside": 10,
        "duplex": 15
      },
      "colorful": {
        "oneside": 20,
        "duplex": 30
      }
    }
  }],
  "atmInfo": {
    "maxPageCount": 200,
    "desc": ""
  },
  "dispatch": {
    "maxPageCount": 500,
    "distributionStart": 500,
    "distributionCharge": 200,
    "desc": ""
  },
  "minCharge": 0,
  "reduction": {
    "withCoupon": false,
    "newUser": 0,
    "full": [],
    "redPacket": true,
    "activity": []
  }
}
```

### 3. 获得文档页面信息

GET:  /API/file/page

Parameters:

```js
md5: 文件的MD5值（HEX编码全大写，以下皆是）
name: 文件名
```

描述：通过 md5 检查云端是否存在此文档，避免重复上传，并获取文档。

Response:

> 查询到已存在时，返回文件页数

```js
{
  "result": "EXISTED",
  "pageCount": 6,    // 文件总页数
  "direction": true  // 排版方向是否为竖版, true 表示竖版
}
```

> 查询到不存在时，只需返回不存在状态

```js
{"result": "NO_EXIST"}
```

### 4. 获得文件上传地址

GET:  /API/file/url

Parameters:

```js
md5: 文件的MD5值
name: 文件名
```

描述：获取云端空间的目标上传地址及权限

Response:

```js
{
  "result": "OK",
  "info": {
    "url": String // url 需要加上协议，如 https://xxxx/xxx
  }
}
```

### 5. 上传文件

POST:  /API/file/upload

描述：上传文件

post require payload:

```http
------WebKitFormBoundaryNbNE3mklwm2Gf9lu
Content-Disposition: form-data; name="file"; filename="XXX.docx"
Content-Type: application/vnd.openxmlformats-officedocument.wordprocessingml.document
```

post entity body:

```js
文件二进制
```

Response:

> 无

【注】受目前所用框架限制，此处无法获取 Response，包括 `"result": "ERROR"` 的错误也无法获取，因此若上传出错，请返会对应情况的  `4xx` 和 `5xx` HTTP 状态码。


### 6. 获取打印预览图片

GET:  /API/file/pic/preview

Parameters:

```js
md5: String 文件的MD5值
page: Number 需要查看打印预览的第多少页
size: String 打印页面大小 'A4', 'A3' 等选项
color: String "mono"为黑白打印，"colorful" 为彩色打印
row: Number 多合一打印下每行几份
col: Number 多合一打印下每列几份
```

描述：获取一个文件的打印预览图片显示

Response:

> 获取预览成功时返回图片地址

```js
{
  "result": "OK",
  "info": {
    "img": "/xxxxx.jpg"    // 图片链接
  }
}
```

### 7. 登录请求

// TODO

### 8. 确认打印信息

POST:  /API/order/verify

描述： 将用户选择的打印信息发到后端再次校验，并生成订单

post entity body

```js
{
  "id": String<Number>, // 打印点的唯一编号
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
  "dispatching": { // Object 配送信息 全为空表示不配送
    "username": String, // 配送用户名
    "userPhone": String,// 用户手机号
    "address": String,  // 配送地址
    "leftMessage": String // 用户留言
  }
}

// example
{
  "id": "0026",
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
    "username": "",
    "userPhone": "",
    "address": "",
    "leftMessage": ""
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



### 9.获取订单详情

GET:  /API/order/detail

Parameters:

```js
orderId: 订单号
```

描述：获取订单详情信息，用于查询订单各种状态

Response:

> 获取订单成功则返回订单详情

```js
{
  "result": "OK",
  "info": {
    "orderId": String, // 订单号
    "orderType": String, // 所选打印点类型, 同第8点checkOut中相同字段，以下均简写
    "orderSecret": String<Number>, // 订单 secret
    "orderCode": String<Number>, // 订单 secret code
    "auth": String, // 用户权限标识
    "status": "TOPAY", // 当前订单状态 将要支付"TOPAY"，正在支付"PAYING"，已支付"PAID"
    "money": Number, // 同checkOut相同字段
    "actual_money": Number, // 实际需付金额
    "pageCount": Number, // 总共页数
    "orderDate": String<Number>, // 订单产生时间戳(毫秒)
    "payMethod": String, // 支付方式  微信"WXPAY" 或 支付宝"ALIPAY"
    "printDate": String<Number>,//支付时时间戳
    "userId": String, // 用户ID
    "username": String, // 用户名
    "phone": String<Number>,// 用户手机号
    "PrePointId": String<Number>, // 同checkOut pointId字段
    "printPointName": String, // 同checkOut相同字段,
    "printDate": String<Number>,// 打印时时间戳
    "actualPointId": String<Number>,// 实际执行打印的点的ID
    "actualPrintPointName": String,// 实际执行打印的点的名称
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
      "fileID": String, // 同checkOut相同字段
      "fileName": String, // 同checkOut相同字段
      "direction": Boolean, // true 表示文档竖直排版，false为横板
      "layout": Number, // 同checkOut相同字段
      "color": String,  // 同checkOut相同字段
      "duplex": Number, // 同checkOut相同字段
      "copies": Number, // 同checkOut相同字段
      "canDownload": Boolean, // 是否可下载文件  true 表示可下载
      "startPage": Number, // 同checkOut相同字段
      "endPage": Number, // 同checkOut相同字段
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
    "orderId": "201708172723119316581112",
    "orderType": "ATM",
    "orderSecret": "120717116541",
    "orderCode": "61320401",
    "auth": "2411fba29cd8cc72f1ad5a103037fdf9",
    "status": "TOPAY",
    "money": 10,
    "actual_money": 10,
    "pageCount": 1,
    "orderDate": "1502983017322",
    "payMethod": "",
    "payDate": "",
    "userId": "9bc65f5a98bd0e36ef4bdf81",
    "username": "测试人",
    "phone": "189xxxx1234",
    "PrePointId": "0001",
    "printPointName": "综合楼大厅",
    "printDate": "",
    "actualPointId": "",
    "actualPrintPointName": "",
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

### 10. 获取支付通道

GET:  /API/pay/payment

Parameters:

```js
orderId: 订单号
payType: 支付方式，微信为 "WXPAY"
```

描述：获取订单支付时所需要的二维码

Response:

> 获取成功时返回二维码地址

```js
{
  "result": "OK",
  "info": {
    "QRCode": String // 二维码地址参数
  }
}
```

### 11. 获取二维码图片

GET:  /API/pay/QRCode

Parameters:

```js
size: 二维码大小，数字，单位px
uri: 二维码地址，即上一项获取的二维码地址参数
```

描述：获取指定大小的二维码图片

Response:

> 成功时直接返回图片

### 12. 查询交易状态

GET:  /API/pay/trade

Parameters:

```js
orderID: 订单号
payType: 支付方式
```

描述：用于前端轮询查询该笔订单是否已支付完成

Response:

> 成功查询时，返回订单交易状态

```js
{
  "result": String // 当前交易状态
}
// 状态有3种
// "PAYING" 正在支付
// "PAID"   已完成支付
// "CANCEL" 取消订单
```





