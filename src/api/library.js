import { get } from '@/utils/axios';
import * as API from './url';

/**
 * 文档排序规则
 * @typedef DocsOrder
 * @type {string} - 表示所搜索的文档倒排序规则，有如下 3 个值
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
