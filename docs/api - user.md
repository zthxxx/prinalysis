# 用户相关 API 说明

## 0. 扫码登录流程图

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

## 1. 检测登录状态

GET:  /API/user/login/state

cookies 携带 session 后台检测状态

描述：检测当前链接是否登录

?> 权限：依赖 session，但不强制需要权限

```js
/**
 * 用户基础信息对象
 * @typedef {object} UserBase
 */
{
  "code": string,     // 手机号国际区号
  "username": string, // 用户账号
  "nickname": string, // 用户姓名昵称
  "uid": string, // 用户 ID
  "access": string, // 身份权限角色，"user" | "vendor" | "manager"，对应 个人，商家 ，管理者
  "avatar": string, // 头像图片 url
  "address": string, // 用户配送文件地址
  "lastPointAddress": string[], // 上次下单的打印点位置，如 ["city", "address"]，数组每项应依次与打印点 API 第 0 点每一层相对应
  "lastPoint": string, // 上次下单的打印点 ID - "1240-235-34"
}
```

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
  "info": UserBase // 如上定义用户基础信息对象
}
```

## 2. 获取登录二维码

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

## 3. 获取用户详细信息

GET: /API/user/info

描述：获取用户详细信息

?> 权限：需要权限

Response:

> 登陆后返回用户信息

```js
{
  "result": "OK",
  "info": {
    ...UserBase, // 包含用户基础信息对象每个字段，且含义相同
    "created": Date, // 创建时间戳，Unix timestamp，毫秒
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

## 4. 更新部分用户信息

PUT: /API/user/info

Parameters:

```js
{
  "nickname": string,	// 用户昵称
  "avatar": string,		// 头像 url 或 base64 data url，为空时表示不更新头像
  "address": string		// 配送地址
}
```

描述：用于更新用户的部分个人信息

Response:

> 登录成功返回用户基本信息 （同[第 1 点](#1-检测登录状态) 或 [第 3 点](#3-获取用户详细信息)）

## 5. 用户账户登录注册流程

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
          |     Login Flow     |         |  fetch user info  |
          |                    |         |                   |
          +---------+----------+         +---------+---------+
                    |                              ^
          +---------v----------+                   |
          |                    |                   |
          |    have account?   |                   |
          |                    |                   |
          +---------+----------+                   |
                    |                              |
         +----------+-----------+                  |
         |                      |                  |
 +-------v-------+     +--------v--------+         |
 |               |     |                 |         |
 |  Signup Flow  |     |  login account  +--------->
 |               |     |                 |         |
 +-------+-------+     +-----------------+         |
         |                                         |
+--------v--------+                                |
|                 | <-----------+                  |
|  registerable?  | no & change |                  |
|                 +-------------+                  |
+--------+--------+                                |
         | yes                                     |
+--------v--------+  +----------------+    +-------+---------+
|                 |  |                | ok |                 |
|  send  captcha  +--> verify captcha +----> complete signup |
|                 |  |                |    |                 |
+--------+--------+  +-------+--------+    +-----------------+
         ^                   |
         |            error  |
         +-------------------+
```

## 6. 用户账号登录

POST: /API/user/logining

Parameters:

```js
{
  "code": string,     // 手机号国际区号
  "username": string, // 用户名
  "password": string  // 用户密码，明文
}
```

描述：使用用户名及账号密码完成登录认证

Response:

> 登录成功返回用户基本信息 （[同第 1 点](#1-检测登录状态)）

## 7. 用户登出注销

POST: /API/user/logout

描述：用户账号登出

?> 权限：需要权限

Response:

> 注销成功返回 OK

```js
{
  "result": "OK"
}
```

## 8. 账户是否可注册

GET: /API/user/registerable

描述：查询此账户是否可注册

Parameters:

```js
code: string,    // 手机号国际区号
username: string // 用户名账号
```

Response:

> 可注册则返回 OK，已注册不可重复注册返回错误

```js
{
  "result": "OK"
}
```

## 9. 发送用户(注册 | 登录)短信验证码

POST: /API/user/SMS/captcha

描述：向后台请求发送用户账号 (注册 | 登录) 时所需的短信验证码

Parameters:

```js
{
  "code": string,     // 手机号国际区号
  "username": string, // 用户名(且为手机号才可发送短信验证码)
}
```

Response:

> 此处后台应限制频率（默认 30s），超过频率返回错误，
>
> 请求成功返回 OK

```js
{
  "result": "OK"
}
```

## 10. 完成用户注册

POST: /API/user/signing

描述：根据用户信息注册账户

注：密码安全性应有检验，如长度、安全强度等；目前前端只做了八位最低长度校验

Parameters:

```js
{
  "code": string,     // 手机号国际区号
  "username": string, // 用户名
  "password": string, // 账户密码
  "nickname": string, // 用户姓名昵称
  "captcha": string   // 验证码
}
```

Response:

> 注册成功返回用户基本信息 （[同第 1 点](#1-检测登录状态)）



## 11. 修改用户密码

PUT: /API/user/passwd

描述：用户请求修改密码，先确认原始密码正确，才能修改新密码

Parameters:

```js
{
  "origin": string,    // 原始密码
  "news": string       // 新密码
}
```

Response:

> 注册成功返回 OK
>
> 失败时，如原密码不正确，则返回 ERROR 且，message 为错误信息描述

