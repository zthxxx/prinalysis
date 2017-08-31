import {get, post} from '@/utils/fetch'
import * as API from './url'
import statusIntercept from './wrapper'
const _get = statusIntercept(get);
const _post = statusIntercept(post);

/**
 * 登陆
 */
export const login = data => _post(API.LOGIN, data);

/**
 * 退出
 */
export const signout = () => _get(API.SIGNOUT);

/**
 * 获取校园地址
 */
export const getAddresses = () => _get(API.ADDRESS);

/**
 * 获取地址对应打印点信息
 */
export const getPoints = ([city, school, campus]) => _get(API.POINTS, {city, school, campus});

/**
 * 检验通过MD5检验文档是否存在, 避免重复上传，并获取文档页数
 */
export const getPage = ({md5, name}) => get(API.PAGE, {md5, name});

/**
 * 获取云端空间的目标上传地址及权限
 */
export const getFileURL = ({md5, name}) => _get(API.FILEURL, {md5, name});

/**
 * 上传文件
 */
export const uploadFile = (file) => post(API.UPLOAD, file);

/**
 * 文档预览
 */
export const filePreview = ({md5, layout, page}) => _get(API.PREVIEW, {md5, layout, page});

/**
 * 确认打印信息
 */
export const verifyOrder = ({pointID, files, money, couponID, reduction, dispatching}) =>
  _get(API.VERIFY, {pointID, files, money, couponID, reduction, dispatching});


