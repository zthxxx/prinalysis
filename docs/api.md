# 云打印前端 API 需求说明

【注】以下 `/API/` 为地址前缀，应由真实地址替换。金额数值处理（即API中表示金额的数值）均以人民币`分`为单位，前端显示金额（无关API）均以`元`为单位。

本 API 说明文档风格参考 [GitHub API](https://developer.github.com/v3/apps/) 。



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



### 1.各功能模块 API 文档

1. [打印点相关 api](./api - point.md)
2. [文件操作相关 api](./api - file.md)
3. [用户相关 api](./api - user.md)
4. [订单相关 api](./api - order.md)
5. [支付相关 api](./api - pay.md)