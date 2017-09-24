import {get, post} from '@/utils/fetch'
import * as API from './url'
import statusIntercept from './wrapper'
const _get = statusIntercept(get);
const _post = statusIntercept(post);

/**
 * 登录
 */
export const login = data => _post(API.LOGIN, data);

/**
 * 退出
 */
export const signout = () => _get(API.SIGNOUT);

/**
 * 获取校园地址
 * @return {Object} ADDRESS - 地址池对象
 */
export const getAddresses = () => _get(API.ADDRESS);

/**
 * 获取地址对应打印点信息
 * @param {sting} ID - 具体地址 id
 * @return {POINT[]} - 打印点数组
 */
export const getPoints = ID => get(API.POINTS, {ID});

/**
 * 检验通过MD5检验文档是否存在, 避免重复上传，并获取文档页数
 * @param {sting} .md5 - 文件 MD5 值，全大写
 * @param {sting} .name - 文件名
 * @return {{result, pageCount, direction}} - 页面信息对象
 * @return {string} .result - "EXISTED" | "NO_EXIST" 表示文件是否存在
 * @return {number} .pageCount - 文件单页总数
 * @return {boolean} .direction - 排版方向是否为竖版, true 表示竖版
 */
export const getPage = ({md5, name}) => get(API.PAGE, {md5, name});

/**
 * 获取云端空间的目标上传地址及权限
 * @param {sting} .md5 - 文件 MD5 值，全大写
 * @param {sting} .name - 文件名
 * @return {str} .url - 文件上传地址。地址带协议名，如 https://xxxx/xxx
 */
export const getFileURL = ({md5, name}) => _get(API.FILEURL, {md5, name});

/**
 * 上传文件
 * @param {FILE} file - FILE 文件对象
 */
export const uploadFile = file => post(API.UPLOAD, file);

/**
 * 获取打印预览图片
 * @param {sting} .md5 - 文件 MD5 值，全大写
 * @param {number} .page - 需要获取第多少页的打印预览图片
 * @param {sting} .size - 打印页面大小 'A4', 'A3' 等选项
 * @param {number} .row - 多合一打印下每行几份
 * @param {number} .col - 多合一打印下每列几份
 * @return {string} .url - 打印预览图片，总为彩色
 */
export const getPreview = ({md5, page, size, row, col}) => _get(API.PREVIEW, {md5, page, size, row, col});

/**
 * 确认打印信息
 */
export const verifyOrder = ({pointID, files, money, couponID, reduction, dispatching}) =>
  _get(API.VERIFY, {pointID, files, money, couponID, reduction, dispatching});

/**
 * 检测登录状态
 * @return {string | Object} - 返回字符串时 "LOGINING" 表示未登录
 * @return {USER} - 返回用户信息对象
 * @return {string} .nickname - 用户名
 * @return {string} .uid - 用户 ID
 * @return {string} .phone - 用户手机号，大陆区应为 3+11 位
 * @return {string} .avatar - 用户头像图片 url
 * @return {string[]} .lastAddress - 最后一次下单的打印点位置
 * @return {string} .lastPoint - 最后一次下单的打印点 ID
 */
export const checkLogin = () => _get(API.LOGIN_STATE);

/**
 * 获取登录二维码图片地址
 * @return {string} .url - 用于获取二维码图片的 url
 */
export const getLoginQR = () => _get(API.QR_CODE);

/**
 * 获取用户详细信息
 * @return {USER} - 返回用户信息对象
 * @return {string} .nickname - 用户名
 * @return {string} .uid - 用户 ID
 * @return {string} .phone - 用户手机号，大陆区应为 3+11 位
 * @return {string} .avatar - 用户头像图片 url
 * @return {string} .address - 用户配送文件地址
 * @return {date} .createDate - 创建时间戳，Unix timestamp，毫秒
 * @return {Object} .library - 文库信息对象
 * @return {number} .library.illegalCount - 上传非法次数
 * @return {number} .library.uploadFileCount - 上传文件次数
 * @return {number} .library.acceptFileCount - 上传成功次数
 * @return {number} .library.deleteFileCount - 删除文件次数
 * @return {Object} .school - 所在学校位置信息
 * @return {string} .school.city - 城市
 * @return {string} .school.name - 学校名
 * @return {string} .school.campus - 校区名
 */
export const getUserInfo = () => _get(API.USER_INFO);
