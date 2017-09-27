### 0. 扫码登录流程图

【注】因 GitHub 不支持 Markdown 流程图，所以使用 asciiflow，包含中文请用等宽字体查看

```
                        +---------------------+
                        |                     |
                        |  check login state  |
                        |                     |
                        +----------+----------+
                                   |
                        NOT Login  |  Logined
                   +---------------+--------------+
                   |                              |
         +---------v----------+         +---------v---------+
         |                    |         |                   |
         |  get login QRCode  |         |  fetch user info  |
         |                    |         |                   |
         +---------+----------+         +---------+---------+
                   |                              ^
+------------------>                              |
|                  |                              |
|                  |                              |
|       +----------v----------+                   |
|  NOT  |                     |                   |
+-------+  check login state  +-------------------+
  Login |                     |  Completed Login
        +---------------------+
```

### 1. 检测登录状态

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

> 登陆后直接返回用户基础信息

```js
{
  "result": "OK",
  "info": {
    "nickname": string, // 用户名
    "uid": string, // 用户 ID
    "access": string, // 身份权限角色，"user" | "vendor" | "manager"，对应 个人，商家 ，管理者
    "avatar": string, // 头像图片 url
    "lastAddress": string[], // 上次下单的打印点位置 - ["city", "address"]
    "lastPoint": string, // 上次下单的打印点 ID - "1240-235-34"
  }
}
```

### 2. 获取登录二维码

GET: /API/user/login/QRCode

描述：在未登录时获取用于扫码的登录二维码图片地址

Response:

> 未登录时返回图片地址

```js
{
  "result": "OK",
  "info": {
    "url": string // 用于获取二维码图片的 url（图片建议大小 300px）
  }
}
```

> 登录时请求则返回错误

### 3. 获取用户信息

GET: /API/user/info

描述：获取用户详细信息

Response:

> 登陆后返回用户信息

```js
{
  "result": "OK",
  "info": {
    "nickname": string, // 用户名
    "uid": string, // 用户 ID
    "access": string, // 身份权限角色，"user" | "vendor" | "manager"，对应 个人，商家 ，管理者
    "phone": string, // 手机号，大陆应为 3+11 位 "+8612345678910"
    "avatar": string, // 头像图片 url
    "address": string, // 用户配送文件地址
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

### 4. 用户账号登录

POST: /API/user/logining

Parameters:

```js
{
  "username": string, // 用户名
  "password": string  // 用户密码，明文
}
```

描述：使用用户名及账号密码完成登录认证

Response:

> 登录成功返回用户基本信息 （[同第 1 点](#1-检测登录状态)）

### 5. 用户登出注销 

POST: /API/user/logout

描述：用户账号登出

Response:

> 注销成功返回 OK

```js
{
  "result": "OK"
}
```

### 6. 发送用户(注册 | 登录)短信验证码

POST: /API/user/SMS/captcha

描述：向后台请求发送用户账号 (注册 | 登录) 时所需的短信验证码

Parameters:

```js
{
  "username": string, // 用户名(且为手机号才可发送短信验证码)
}
```

Response:

> 请求成功返回 OK

```js
{
  "result": "OK"
}
```

### 7. 用户注册

POST: /API/user/signing

Parameters:

```js
{
  "username": string, // 用户名
  "password": string, // 账户密码
  "nickname": string, // 用户姓名昵称
  "captcha": string   // 验证码
}
```

Response:

> 注册成功返回用户基本信息 （[同第 1 点](#1-%E6%A3%80%E6%B5%8B%E7%99%BB%E5%BD%95%E7%8A%B6%E6%80%81)）

