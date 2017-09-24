const BaseUrl = process.env.API_BASE;

export const LOGIN = `${BaseUrl}/admin/login`;

export const SIGNOUT = `${BaseUrl}/admin/singout`;

export const ADDRESS = `${BaseUrl}/point/address`;

export const POINTS = `${BaseUrl}/point/points`;

export const PAGE = `${BaseUrl}/file/page`;

export const FILEURL = `${BaseUrl}/file/url`;

export const UPLOAD = `${BaseUrl}/file/upload`;

export const PREVIEW = `${BaseUrl}/file/pic/preview`;

export const VERIFY = `${BaseUrl}/order/verify`;

export const LOGIN_STATE = `${BaseUrl}/user/login/state`;

export const QR_CODE = `${BaseUrl}/user/login/QRCode`;

export const USER_INFO = `${BaseUrl}/user/info`;
