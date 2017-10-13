import { get } from '@/utils/axios';
import * as API from './url';

/**
 * 获取校园地址
 * @return {Addresses} - 地址池对象
 */
export const getAddresses = () => get(API.ADDRESS);

/**
 * 获取地址对应打印点信息
 * @param {string} ID - 具体地址 id
 * @return {Point[]} - 打印点对象数组
 */
export const getPoints = ID => get(API.POINTS, { ID });
