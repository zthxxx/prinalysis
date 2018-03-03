import { get, post } from '@/utils/axios'
import * as API from './url'

/**
 * 文档排序规则
 * @typedef {string} DocsOrder - 文档排序规则
 * @enum {string} - 表示所搜索的文档倒排序规则，有如下 3 个值
 * "COLLECTED" - 以收藏数倒排序
 * "PRINT" - 以打印次数倒排序
 * "TIME" - 以上传时间倒排序
 */

/**
 * 获取支持搜索的专业科目
 * @return {object} - 返回中包含 defaults 和 optional 两个字段
 * @property {object} default - 代表用户的默认选项
 * @property {object} optional - 代表能够提供支持的选项集合
 */
export const getProfession = () => get(API.PROFESSION_SEARCH)

/**
 * 获取支持搜索的专题
 * @return {object} - 返回中包含 defaults 和 optional 两个字段
 * @property {object} default - 代表用户的默认选项
 * @property {object} optional - 代表能够提供支持的选项集合
 */
export const getThematic = () => get(API.THEMATIC_SEARCH)

const searchMap = {
  profession: getProfession,
  thematic: getThematic
}

/**
 * 获取文库搜索的可选项
 * @param {string} type - 搜索方式 profession | thematic
 * @return {object | Array} 专业科目可选项或专题可选项
 */
export const getLibOptional = type => searchMap[type]()


/**
 * @typedef {object} DocFile - 搜索到的文档文件对象
 * @property {string} id - 文档 ID
 * @property {string} name - 文档名
 * @property {date} created - 文档创建时间戳
 * @property {number} pages - 文档页数
 * @property {string} format - 文档格式（或扩展名）
 * @property {number} collected - 收藏数
 * @property {number} printed - 打印次数
 * @property {string} uid - 上传用户 ID
 * @property {string} nickname - 上传用户昵称
 */

/**
 * @typedef {object} DocsFloder - 搜索到的精选集对象
 * @property {string} id - 精选集 ID
 * @property {string} name - 精选集名
 * @property {date} updated - 本集合的最后修改时间
 * @property {number} count - 包含文件数
 * @property {number} collected - 收藏数
 * @property {number} view - 浏览次数
 * @property {string} uid - 创建用户 ID
 * @property {string} nickname - 创建用户昵称
 */

/**
 * 高阶函数，返回生成对应请求的搜索函数
 * @param {string} target - 请求 url
 * @returns {function} 搜索函数
 */
const seekTarget = target => {
  /**
   * 搜索文库中的文档或精选集
   * @param {string} method - 搜索方式 profession | thematic
   * @param {string} [institute] - 学院对应的 ID
   * @param {string} [major] - 专业
   * @param {string} [semester] - 学期
   * @param {string} [subject] - 科目
   * @param {string} [category] - 话题分类
   * @param {string} [topic] - 话题名
   * @param {DocsOrder} order - 排序方式
   * @return {DocFile[] | DocsFloder[]} - 返回文件或精选集集合
   */
  return ({
    method,
    institute, major, semester, subject,
    category, topic,
    order
  }) => get(target, {
    method,
    institute, major, semester, subject,
    category, topic,
    order
  })
}

/**
 * 搜索文库中的文档
 * @return {DocFile[]} - 返回文件集合
 */
export const seekLibFiles = seekTarget(API.FILES_SEARCH)

/**
 * 搜索文库中的精选集
 * @return {DocsFloder[]} - 返回精选集列表
 */
export const seekLibFolders = seekTarget(API.FOLDERS_SEARCH)

/**
 * 获取包含指定文件的精选集
 * @param {string} fileID
 * @return {DocsFloder[]} - 返回精选集列表
 */
export const containedFolders = fileID => get(API.FOLDERS_CONTAIN, { fileID })

/**
 * 提交用户评论
 * @param {string} fileID - 文件 ID
 * @param {string} uid - 用户 ID
 * @param {string} content - 用户评论内容
 */
export const submitFileComment = ({ fileID, uid, content }) => post(API.FILE_COMMENT, { fileID, uid, content })


/**
 * @typedef {object} Comment - 单条评论内容
 * @property {string} uid - 评论用户 ID
 * @property {string} avatar - 评论用户头像
 * @property {string} nickname - 用户昵称
 * @property {string} commentID - 本条评论 ID 值
 * @property {string} content - 评论内容
 * @property {date} created - 评论提交时间
 */

/**
 * 加载用户评论
 * @param {string} fileID - 文件 ID
 * @return {Comment[]} - 评论列表
 */
export const loadFileComment = fileID => get(API.FILE_COMMENT, { fileID })


/**
 * @typedef {object} FolderInfo - 精选集信息
 * @property {string} name - 精选集名
 * @property {string} description - 精选集描述简介
 * @property {string[]} tags - 精选集标签
 * @property {date} created - 精选集创建时间
 * @property {number} viewed - 浏览次数
 * @property {number} collected - 收藏数
 * @property {object} uploader - 创建者用户
 * @property {string} uploader.id - 用户 ID
 * @property {string} uploader.avatar - 用户头像 url
 * @property {string} uploader.nickname - 用户昵称
 * @property {DocFile[]} files - 精选集包含的文件集合
 */

/**
 * 获取精选集的详细信息
 * @param {string} folderID - 精选集 ID
 * @return {FolderInfo} - 精选集详细信息
 */
export const getFolderInfo = folderID => get(API.FOLDER_DETAIL, { folderID })


/**
 * 获取用户个人的收藏夹列表
 * @param {string} uid - 用户 ID
 */
export const getPersonCollect = uid => get(API.PERSON_COLLECT, { uid })

