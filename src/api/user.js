import { get, post } from '@/utils/axios'
import * as API from './url'

/**
 * 用户基本信息对象
 * @typedef {object} UserBase
 * @property {string} username - 用户账号
 * @property {string} nickname - 用户姓名昵称
 * @property {string} uid - 用户 ID
 * @property {string} access - 身份权限角色，"user" | "vendor" | "manager"，对应 个人，商家 ，管理者
 * @property {string} avatar - 用户头像图片 url
 * @property {string} address - 用户默认配送文件地址
 * @property {string[]} lastPointAddress - 最后一次下单的打印点位置
 * @property {string} lastPoint - 最后一次下单的打印点 ID
 */

/**
 * 用户详细信息对象
 * @typedef {object} UserInfo
 * @property {string} username - 用户账号
 * @property {string} nickname - 用户姓名昵称
 * @property {string} uid - 用户 ID
 * @property {string} phone - 用户手机号，大陆区应为 3+11 位
 * @property {string} avatar - 用户头像图片 url
 * @property {string} address - 用户配送文件地址
 * @property {date} created - 创建时间戳，Unix timestamp，毫秒
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
 * @param {string} code - 手机号国际区号
 * @param {string} username - 用户名
 * @param {string} password - 用户密码，明文
 * @return {UserBase} - 用户基本信息对象
 */
export const login = ({ code, username, password }) => post(
  API.LOGIN,
  { code, username, password }
)

/**
 * 用户注销
 */
export const signout = () => post(API.SIGNOUT)

/**
 * 检测登录状态
 * 返回字符串时 "LOGINING" 表示未登录前的各种状态（未登录 | 正在登录 | 正在授权）
 * 已登录时返回用户基本信息对象
 * @return {(string | UserBase)}
 */
export const checkLogin = () => get(API.LOGIN_STATE)

/**
 * 获取登录二维码图片地址
 * @return {{url: string}} - 用于获取二维码图片的 url
 */
export const getLoginQR = () => get(API.QR_CODE)

/**
 * 判断账户名是否可注册
 * @param {string} code - 手机号国际区号
 * @param {string} username - 用户账户名
 */
export const isRegisterable = ({ code, username }) => get(API.REGISTERABLE, { code, username })

/**
 * 请求发送用户(注册 | 登录)短信验证码
 * @param {string} code - 手机号国际区号
 * @param {string} username - 用户名（必须为手机号）
 */
export const requireSMS = ({ code, username }) => post(API.SMS_CAPTCHA, { code, username })

/**
 * 完成用户注册
 * @param {string} code - 手机号国际区号
 * @param {string} username - 用户名
 * @param {string} password - 账户密码
 * @param {string} nickname - 用户姓名昵称
 * @param {string} captcha - 验证码
 * @return {UserBase}
 */
export const signup = ({ code, username, password, nickname, captcha }) => post(
  API.SIGNUP,
  { code, username, password, nickname, captcha }
)

/**
 * 获取用户详细信息
 * @return {UserInfo} - 返回用户信息对象
 */
export const getUserInfo = () => get(API.USER_INFO)
