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
 * @typedef DocsOrder
 * @type {string} - 表示所搜索的文档倒排序规则，有如下 3 个值
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
          专业: { // Object - 支持的专业，以及专业下支持的学期
            学期: [科目] // Array[String] - 当前学期下支持的科目
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
          "建筑学": {
            "大一上": ["大学英语(一)", "大学英语(B)"],
            "大二下": ["大学英语(一)", "大学英语(B)"]
          },
          "土木工程": {
            "大一上": ["大学英语(B)"]
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
      分类: [专题] // Array[String] - 当前话题分类下的专题列表
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

