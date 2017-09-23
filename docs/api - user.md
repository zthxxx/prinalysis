### 0. 检测登录状态

GET:  /API/user/login/state

cookies 携带 session 后台检测状态

描述：检测当前链接是否登录

Response:

> 未登录时返回 logining 状态

```js
{
  "result": "OK",
  "info": "LOGINING"
}
```

> 登陆后直接返回用户信息

```js
{
  "result": "OK",
  "info": {
    "nickname": string, // 用户名
    "uid": string, // 用户 ID
    "phone": string, // 手机号，大陆应为 3+11 位 "+8612345678910"
    "avatar": string, // 头像图片 url
    "lastAddress": string[], // 上次下单的打印点位置 - ["city", "address"]
    "lastPoint": string, // 上次下单的打印点 ID - "1240-235-34"
  }
}
```

### 1. 获取登录二维码

GET: /API/user/login/QRCode

描述：在未登录时获取用于扫码的登录二维码图片地址

Response:

> 未登录时返回图片地址

```js
{
  "result": "OK",
  "info": {
    "url": string, // 用于获取二维码图片的 url（图片建议大小 300px）
  }
}
```

> 登录时请求则返回错误

### 2.获取用户信息

GET: /API/user/info

描述：获取用户详细信息

Response:

> 登陆后返回用户信息

```js
{
  "result": "OK",
  {
    "nickname": string, // 用户名
    "uid": string, // 用户 ID
    "phone": string, // 手机号，大陆应为 3+11 位 "+8612345678910"
    "avatar": string, // 头像图片 url
    "address": string[], // 配送地址
    "createDate": Date, // 创建时间戳，Unix timestamp，毫秒
    "library": { // 文库信息
      "illegalCount": number, // 上传非法次数
      "uploadFileCount": number, // 上传文件次数
      "acceptFileCount": number, // 上传成功次数
      "deleteFileCount": number // 删除文件次数
    },
    "school": { // 所在学校位置信息
      "city": string, // 城市
      "name": string, // 学校名
      "campus": string // 校区名
    }
  }
}
```







