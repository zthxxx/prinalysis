import { get } from '@/utils/axios'
import * as API from './url'

/**
 * 检验通过MD5检验文档是否存在, 避免重复上传，并获取文档页数
 * @param {string} md5 - 文件 MD5 值，全大写
 * @param {string} name - 文件名
 * @return {object} - 页面信息对象
 * @property {string} state - ("EXISTED" | "NO_EXIST") 表示文件是否存在
 * @property {number} pageCount - 文件单页总数
 * @property {boolean} direction - 排版方向是否为竖版, true 表示竖版
 */
export const getPage = ({ md5, name }) => get(API.PAGE, { md5, name })

/**
 * 获取云端空间的目标上传地址及权限
 * @param {string} md5 - 文件 MD5 值，全大写
 * @param {string} name - 文件名
 * @return {{url: string}} - 文件上传地址。地址带协议名，如 https://xxxx/xxx
 */
export const getFileURL = ({ md5, name }) => get(API.FILEURL, { md5, name })

/**
 * 获取打印预览图片
 * @param {string} md5 - 文件 MD5 值，全大写
 * @param {number} page - 需要获取第多少页的打印预览图片
 * @param {string} size - 打印页面大小 'A4', 'A3' 等选项
 * @param {number} row - 多合一打印下每行几份
 * @param {number} col - 多合一打印下每列几份
 * @return {{url: string}} - 打印预览图片 url （图片总为彩色）
 */
export const getPreview = ({ md5, page, size, row, col }) => get(
  API.PREVIEW,
  { md5, page, size, row, col }
)
