# 文库相关 API 说明

## 0. 获取支持搜索的专业科目

GET:  /API/library/profession

描述：用于获得可供用户选择的专业科目集合

Response:

> 正确响应时，返回的 info 中包含 `defaults` 和 `optional` 两个字段。
>
> `default` 代表用户的默认选项（如最后一次查询的选项）。
>
> `optional` 代表能够提供支持的选项集合。前两层键值对依次表示学校、学院，格式同打印点 API 第 0 点校园地址的表示方法；从第 3 层键值对开始，依次表示专业、学期、科目。

```js
/**
 * 文档排序规则
 * @typedef {string} DocsOrder - 文档排序规则
 * @enum {string} - 表示所搜索的文档倒排序规则，有如下 3 个值
 * "COLLECTED" - 以收藏数倒排序
 * "PRINT" - 以打印次数倒排序
 * "TIME" - 以上传时间倒排序
 */
```

```js
{
  "result": "OK",
  "info": {
    "default": { // 用户默认选项
      "institute": Array<String>, // 默认的 [学校, 学院] 名称
      "major": String,     // 默认选择的专业
      "semester": String,  // 默认的学期
      "subject": String,   // 默认的科目
      "order": DocsOrder   // 排序方式，见上述 DocsOrder 定义
    },
    "optional": [{ // 支持的可选项集合
      学校: [{ // Array<Object>
        学院: { // 前两层为同打印点 API 第 0 点校园地址相同格式的学校学院名
          "id": String, // 学院对应的 ID，用于后续查询参数
          "majors": { // 学院对应的专业集合
            专业: { // Object - 支持的专业，以及专业下支持的学期
              学期: [科目] // Array<String> - 当前学期下支持的科目
            }
          }
        }
      }]
    }]
  }
}
```

```js
// response example
{
  "result": "OK",
  "info": {
    "default": {
      "institute": ["xx 大学", "xx 学院"],
      "major": "土木工程",
      "semester": "大一上",
      "subject": "材料力学(A)",
      "order": "COLLECTED"
    },
    "optional": [{
      "xx 大学": [{
        "xx 学院": {
          "id": 1,
          "majors": {
            "建筑学": {
              "大一上": ["大学英语(一)", "大学英语(B)"],
              "大二下": ["大学英语(一)", "大学英语(B)"]
            },
            "土木工程": {
              "大一上": ["大学英语(B)"]
            }
          }
        }
      }]
    }]
  }
}
```

## 1. 获取支持搜索的专题

GET:  /API/library/thematic

描述：用于获得可供用户选择的专题集合

Response:

> 正确响应时，返回的 info 中包含 `defaults` 和 `optional` 两个字段。
>
> `defaults`  及 `optional` 代表的含义同第 0 点（默认选项，支持集合），但键值不同。

```js
{
  "result": "OK",
  "info": {
    "default": { // 用户默认选项
      "category": String, // 默认的专题分类名称
      "topic": String,     // 默认选择的专题
      "order": DocsOrder   // 排序方式，同第 0 点
    },
    "optional": { // {String: Array<String>} - 支持的可选项集合
      分类: [专题] // Array<String> - 当前话题分类下的专题列表
    }
  }
}
```

```js
// response example
{
  "result": "OK",
  "info": {
    "default": {
      "category": "金融类",
      "topic": "区块链",
      "order": "COLLECTED"
    },
    "optional": {
      "语言类": ["托福", "雅思", "GRE"],
      "金融类": ["风控", "区块链"]
    }
  }
}
```

## 2. 搜索文库中的文档

GET:  /API/library/search/files

描述：用于通过专业科目或专题搜索获得文库中符合条件的文档列表

Parameters:

```js
// 当通过专业科目搜索时，method 字段固定为 'profession'
method: profession
institute: 学院对应的 ID
major: 专业 - 同第 0 点中定义
semester: 学期 - 同第 0 点中定义
subject: 科目 - 同第 0 点中定义
order: 倒排序方式 - 同第 0 点中 DocsOrder 定义
```

```js
// 当通过专题搜索时，method 字段固定为 'thematic'
method: thematic
category: 专题分类 - 同第 1 点中定义
topic: 专题 - 同第 1 点中定义
order: 倒排序方式 - 同第 0 点中 DocsOrder 定义
```

?> 注：两种查询参数中 `method` 和 `order` 字段均有，其余字段参数会增减变化

Response:

```js
/**
 * @typedef {object} DocFile - 搜索到的文档文件对象
 * @property {string} id - 文档 ID（应对应文件接口中的 md5）
 * @property {string} name - 文档名
 * @property {date} created - 文档创建时间戳
 * @property {number} pages - 文档页数
 * @property {string} format - 文档格式（或扩展名）
 * @property {number} collected - 收藏数
 * @property {number} printed - 打印次数
 * @property {string} uid - 上传用户 ID
 * @property {string} user - 上传用户昵称
 */
```

```js
{
  "result": "OK",
  "info": Array<DocFile> // 文档列表
}
```

## 3. 搜索文库中的精选集

GET:  /API/library/search/floders

描述：通过搜索获得文库中符合条件的精选集

Parameters: 同第 2 点

Response:

```js
/**
 * @typedef {object} DocsFloder - 搜索到的精选集对象
 * @property {string} id - 精选集 ID
 * @property {string} name - 精选集名
 * @property {date} updated - 本集合的最后修改时间
 * @property {number} count - 包含文件数
 * @property {number} collected - 收藏数
 * @property {number} view - 浏览次数
 * @property {string} uid - 创建用户 ID
 * @property {string} user - 创建用户昵称
 */
```

```js
{
  "result": "OK",
  "info": Array<DocsFloder> // 精选集列表
}
```

## 4. 含有指定文件的精选集

GET:  /API/library/contain/floders

描述：通过搜索获得文库中包含指定文件的精选集列表

Parameters: 

```js
fileID: 要搜索的文件 ID（即对应文件 API 中的 md5 值）
```

Response:

> 搜索到后返回精选集列表
>
> 没有搜索结果时返回空数组 `[]`

```js
{
  "result": "OK",
  "info": Array<DocsFloder> // 精选集列表
}
```

## 5. 提交用户对文件的评论

POST:  /API/library/comment/file

描述：提交一条评论内容

?> 权限：需要权限

Parameters: 

```js
{ 
  "fileID": String, // 文件 ID
  "uid": String,    // 用户 ID
  "content": String // 用户评论内容
}
```

Response:

> 评论成功返回 OK

## 6. 加载用户对文件的评论

GET:  /API/library/comment/file

描述：通过搜索获得文库中包含指定文件的精选集列表

Parameters: 

```js
fileID: 文件 ID
```

Response:

> 获得评论后返回评论列表，列表元素应以时间倒序
>
> 没有评论时返回空数组 `[]`

```js
/**
 * @typedef {object} Comment - 单条评论内容
 * @property {string} uid - 评论用户 ID
 * @property {string} avatar - 评论用户头像
 * @property {string} nickname - 用户昵称
 * @property {string} commentID - 本条评论 ID 值
 * @property {string} content - 评论内容
 * @property {date} created - 评论提交时间
 */
```

```js
{
  "result": "OK",
  "info": Array<Comment> // 评论列表
}
```

