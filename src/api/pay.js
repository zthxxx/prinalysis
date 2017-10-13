import { get } from '@/utils/axios';
import * as API from './url';

/**
 * 获取订单支付通道
 * @param {string} orderID - 订单号
 * @param {'WXPAY' | 'ALIPAY'} payway - 支付方式，微信为 "WXPAY"，支付宝为 "ALIPAY"
 * @return {string} QRCode - 对微信支付，返回用于获取二维码图片的地址
 * @return {string} payform - 对支付宝，返回用于提交支付宝表单的 HTML 字符串
 */
export const getPayment = ({ orderID, payway }) => get(API.PAYMENT, { orderID, payway });

/**
 * 查询订单交易状态
 * @param {string} orderID - 订单号
 * @param {'WXPAY' | 'ALIPAY'} payway - 支付方式，微信为 "WXPAY"，支付宝为 "ALIPAY"
 * @return {string} state - 当前交易状态, "PAYING" 正在支付, "PAID" 已完成支付,
 * "CANCEL" 取消订单, "REFUNDING" 正在退款, "REFUNDED" 已退款
 */
export const getTrade = ({ orderID, payway }) => get(API.TRADE, { orderID, payway });
