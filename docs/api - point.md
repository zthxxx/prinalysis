### 0. 获取校园地址

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

### 1. 获取打印点信息

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
