import {get, post} from '@/utils/fetch'
import * as API from './url'

/**
 * 登陆
 */
export const login = data => post(API.LOGIN, data);

/**
 * 退出
 */
export const signout = () => get(API.SIGNOUT);

/**
 * 获取校园地址
 */
export const getAddresses = () => get(API.ADDRESS);

/**
 * 获取地址对应打印点信息
 */
export const getPoints = ([city, school, campus]) => get(API.POINTS, {city, school, campus});

/**
 * 检验通过MD5检验文档是否存在, 避免重复上传，并获取文档页数
 */
export const getPage = ({md5, name}) => get(API.PAGE, {md5, name});
