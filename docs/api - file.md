# 文件操作相关 API 说明

## 0. 获得文档页面信息

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
  "pageCount": Number,    // 文件总页数
  "direction": Boolean  // 排版方向是否为竖版, true 表示竖版
}
```

> 查询到不存在时，只需返回不存在状态

```js
{"result": "NO_EXIST"}
```

## 1. 获得文件上传地址

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

## 2. 上传文件

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


## 3. 获取打印预览图片

GET:  /API/file/pic/preview

Parameters:

```js
md5: String 文件的MD5值
page: Number 需要查看打印预览的第多少页
size: String 打印页面大小 'A4', 'A3' 等选项
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
    "img": String    // 图片链接 url, 如 'http://xxxx.com/xx.jpg'
  }
}
```

