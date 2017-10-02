# Prinalysis API 总览

?>【注】以下 `/API/` 为地址前缀，应由真实地址替换。金额数值处理（即API中表示金额的数值）均以人民币`分`为单位，前端显示金额（无关API）均以`元`为单位。

本 API 说明文档风格参考 [GitHub API](https://developer.github.com/v3/apps/) 。

POST 参数如无特殊说明，均以 payload `param={json}` 的形式传参，`param` 为固定参数键，实际参数为 json 对象字符串，不使用 urlencode 转义; 如 `param={"ID": 5, "name": "xxx"}`



# 0. 统一错误请求返回

描述：在API请求失败或**错误**时返回内容

> `result` 统一为 `ERROR`，`message` 内容为**显示给用户看**的提示信息。

Response:

```js
{
  "result": "ERROR", // ERROR 大写
  "message": "xxxx"
}
```

!>【注】基本响应固定格式为：  若 `result` 为 `ERROR`，那么就有个 `message` 字段的错误消息用于直接给用户看错误提示；
<br/>若 `result` 为 `OK`，那么就有个 `info` 字段内包含前端请求需要获取的各项属性信息。
<br/>若 `result` 不为以上两者的，比如 `EXISTED`，则**不属于以上基本格式**，响应内的属性格式根据请求而定。

!> 设计接口应**优先考虑基本格式**。


# 1. 各功能模块 API 文档入口

1. [打印点相关 API](/api - point)
2. [文件操作相关 API](/api - file)
3. [用户相关 API](/api - user)
4. [订单相关 API](/api - order)
5. [支付相关 API](/api - pay)
