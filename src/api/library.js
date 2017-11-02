import { get } from '@/utils/axios';
import * as API from './url';

/**
 * 文档排序规则
 * @typedef {string} DocsOrder - 文档排序规则
 * @enum {string} - 表示所搜索的文档倒排序规则，有如下 3 个值
 * "COLLECTED" - 以收藏数倒排序
 * "PRINT" - 以打印次数倒排序
 * "TIME" - 以上传时间倒排序
 */

export const getProfession = () => get(API.PROFESSION_SEARCH);

export const getThematic = () => get(API.THEMATIC_SEARCH);

const searchMap = {
  profession: getProfession,
  thematic: getThematic
};

export const getLibOptional = type => searchMap[type]();

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
 * @property {string} user - 上传用户昵称
 */

/**
 * 搜索文库中的文档
 * @param {string} method - 搜索方式
 * @param {string} [institute] - 学院对应的 ID
 * @param {string} [major] - 专业
 * @param {string} [semester] - 学期
 * @param {string} [subject] - 科目
 * @param {string} [category] - 话题分类
 * @param {string} [topic] - 话题名
 * @param {DocsOrder} order - 排序方式
 * @return {DocFile[]} - 返回文件集合
 */
export const seekLibFiles = ({
  method,
  institute, major, semester, subject,
  category, topic,
  order
}) => get(API.FILES_SEARCH, {
  method,
  institute, major, semester, subject,
  category, topic,
  order
});

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

/**
 * 搜索文库中的精选集
 * @param {string} method - 搜索方式
 * @param {string} [institute] - 学院对应的 ID
 * @param {string} [major] - 专业
 * @param {string} [semester] - 学期
 * @param {string} [subject] - 科目
 * @param {string} [category] - 话题分类
 * @param {string} [topic] - 话题名
 * @param {DocsOrder} order - 排序方式
 * @return {DocsFloder[]} - 返回精选集列表
 */
export const seekLibFolders = ({
  method,
  institute, major, semester, subject,
  category, topic,
  order
}) => get(API.FOLDERS_SEARCH, {
  method,
  institute, major, semester, subject,
  category, topic,
  order
});
