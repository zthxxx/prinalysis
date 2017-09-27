import {get, post} from '@/utils/fetch'
import * as API from './url'
import statusIntercept from './wrapper'
const _get = statusIntercept(get);
const _post = statusIntercept(post);

/**
 * 获取校园地址
 * @return {Addresses} - 地址池对象
 */
export const getAddresses = () => _get(API.ADDRESS);

/**
 * 获取地址对应打印点信息
 * @param {string} ID - 具体地址 id
 * @return {{result: string, info: Points[]}} - 打印点对象数组
 */
export const getPoints = ID => get(API.POINTS, {ID});

/**
 * 检验通过MD5检验文档是否存在, 避免重复上传，并获取文档页数
 * @param {string} md5 - 文件 MD5 值，全大写
 * @param {string} name - 文件名
 * @return {object} - 页面信息对象
 * @property {string} result - ("EXISTED" | "NO_EXIST") 表示文件是否存在
 * @property {number} pageCount - 文件单页总数
 * @property {boolean} direction - 排版方向是否为竖版, true 表示竖版
 */
export const getPage = ({md5, name}) => get(API.PAGE, {md5, name});

/**
 * 获取云端空间的目标上传地址及权限
 * @param {string} md5 - 文件 MD5 值，全大写
 * @param {string} name - 文件名
 * @return {{url: string}} - 文件上传地址。地址带协议名，如 https://xxxx/xxx
 */
export const getFileURL = ({md5, name}) => _get(API.FILEURL, {md5, name});

/**
 * 上传文件
 * @param {FILE} file - FILE 文件对象
 */
export const uploadFile = file => post(API.UPLOAD, file);

/**
 * 获取打印预览图片
 * @param {string} md5 - 文件 MD5 值，全大写
 * @param {number} page - 需要获取第多少页的打印预览图片
 * @param {string} size - 打印页面大小 'A4', 'A3' 等选项
 * @param {number} row - 多合一打印下每行几份
 * @param {number} col - 多合一打印下每列几份
 * @return {{url: string}} - 打印预览图片 url （图片总为彩色）
 */
export const getPreview = ({md5, page, size, row, col}) => _get(API.PREVIEW, {md5, page, size, row, col});

/**
 * 确认打印信息
 */
export const verifyOrder = ({pointID, files, money, couponID, reduction, dispatching}) =>
  _get(API.VERIFY, {pointID, files, money, couponID, reduction, dispatching});

/**
 * 用户基本信息对象
 * @typedef UserBase
 * @type {object}
 * @property {string} nickname - 用户名
 * @property {string} uid - 用户 ID
 * @property {string} phone - 用户手机号，大陆区应为 3+11 位
 * @property {string} avatar - 用户头像图片 url
 * @property {string[]} lastAddress - 最后一次下单的打印点位置
 * @property {string} lastPoint - 最后一次下单的打印点 ID
 */

/**
 * 用户详细信息对象
 * @typedef UserInfo
 * @type {object}
 * @property {string} nickname - 用户名
 * @property {string} uid - 用户 ID
 * @property {string} phone - 用户手机号，大陆区应为 3+11 位
 * @property {string} avatar - 用户头像图片 url
 * @property {string} address - 用户配送文件地址
 * @property {date} createDate - 创建时间戳，Unix timestamp，毫秒
 * @property {object} library - 文库信息对象
 * @property {number} library.illegalCount - 上传非法次数
 * @property {number} library.uploadFileCount - 上传文件次数
 * @property {number} library.acceptFileCount - 上传成功次数
 * @property {number} library.deleteFileCount - 删除文件次数
 * @property {object} school - 所在学校位置信息
 * @property {string} school.city - 城市
 * @property {string} school.name - 学校名
 * @property {string} school.campus - 校区名
 */

/**
 * 用户账号登录
 * @param {string} username - 用户名
 * @param {string} password - 用户密码，明文
 * @return {UserBase} - 用户基本信息对象
 */
export const login = ({username, password}) => _post(API.LOGIN, {username, password});

/**
 * 用户注销
 */
export const signout = () => _post(API.SIGNOUT);

/**
 * 检测登录状态
 * 返回字符串时 "LOGINING" 表示未登录前的各种状态（未登录 | 正在登录 | 正在授权）
 * 已登录时返回用户基本信息对象
 * @return {(string | UserBase)}
 */
export const checkLogin = () => _get(API.LOGIN_STATE);

/**
 * 获取登录二维码图片地址
 * @return {{url: string}} - 用于获取二维码图片的 url
 */
export const getLoginQR = () => _get(API.QR_CODE);

/**
 * 请求发送用户(注册 | 登录)短信验证码
 * @param {string} username - 用户名（必须为手机号）
 */
export const requireSMS = ({username}) => _post(API.SMS_CAPTCHA, {username});

/**
 * 完成用户注册
 * @param {string} username - 用户名
 * @param {string} password - 账户密码
 * @param {string} nickname - 用户姓名昵称
 * @param {string} captcha - 验证码
 * @return {UserBase}
 */
export const signup = ({username, password, nickname, captcha}) => _post(API.SIGNUP, {username, password, nickname, captcha});

/**
 * 获取用户详细信息
 * @return {UserInfo} - 返回用户信息对象
 */
export const getUserInfo = () => _get(API.USER_INFO);
