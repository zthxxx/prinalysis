### 0. 获取支付通道

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

### 1. 获取支付二维码图片

GET:  /API/pay/QRCode

Parameters:

```js
size: 二维码大小，数字，单位px
uri: 二维码地址，即上一项获取的二维码地址参数
```

描述：获取指定大小的二维码图片

Response:

> 成功时直接返回图片

### 2. 查询交易状态

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





