<template>
  <div class="pay-modal">
    <header>订单支付</header>
    <div class="paybox zoom-in">
      <div class="price">{{money}}</div>
      <div class="tip" v-if="!payway">下单成功，请选择支付方式</div>
      <div class="tip" v-else>请使用 [{{paywayMap[payway]}}] 进行扫码支付</div>
      <div class="payway" v-if="!payway">
        <div class="wechat zoom-in" @click="getWeixinpay">
          <img class="title" :src="weixinPayIcon">
          <img class="QR-icon" :src="QRCodeIcon.green">
          <span class="way-tip">微信扫码支付</span>
        </div>
        <div class="alipay zoom-in" @click="getAlipay">
          <img class="title" :src="aliPayIcon">
          <img class="QR-icon" :src="QRCodeIcon.blue">
          <span class="way-tip">支付宝扫码支付</span>
        </div>
      </div>
      <div class="QR-box" v-if="payway">
        <img v-if="payway == WXPAY" class="wxPay-code zoom-in" :src="QRCode" alt="weixin pay">
        <iframe v-else-if="payway == ALIPAY" class="aliPay-iframe zoom-in" scrolling="no" :srcdoc="payform"></iframe>
      </div>
      <div>
        <el-button class="switch" @click="changePayWay" v-if="payway">切换支付方式</el-button>
        <el-button class="switch" @click="close">稍后支付</el-button>
      </div>
      <footer class="footer">订单编号：{{orderID}}</footer>
    </div>
  </div>
</template>

<script>
  import { weixinPayIcon, aliPayIcon, QRCodeIcon } from '@/assets/img/pay';
  import { getPayment, getTrade } from '@/api';

  const WXPAY = 'WXPAY';
  const ALIPAY = 'ALIPAY';
  export default {
    name: 'pay-dialog',
    props: {
      orderID: {
        required: true,
        type: String
      },
      money: {
        required: true,
        type: String
      }
    },
    data () {
      return {
        weixinPayIcon,
        aliPayIcon,
        QRCodeIcon,
        WXPAY,
        ALIPAY,
        payway: null,
        paywayMap: {
          [WXPAY]: '微信',
          [ALIPAY]: '支付宝'
        },
        QRCode: '',
        payform: '',
        polling: null
      };
    },
    beforeDestroy () {
      console.warn('clear polling');
      clearTimeout(this.polling);
    },
    methods: {
      close () {
        this.$emit('close');
      },
      async getWeixinpay () {
        let { orderID, payway } = this;
        this.payway = WXPAY;
        let { QRCode } = await getPayment({ orderID, payway });
        this.QRCode = QRCode;
        this.queryTrade();
      },
      async getAlipay () {
        let { orderID, payway } = this;
        this.payway = ALIPAY;
        let { payform } = await getPayment({ orderID, payway });
        this.payform = payform;
        this.queryTrade();
      },
      changePayWay () {
        this.payway = null;
        clearTimeout(this.polling);
      },
      async queryTrade () {
        let { orderID, payway } = this;
        console.info(orderID, payway);
        this.polling = setTimeout(this.queryTrade, 1000);
        let { state } = await getTrade({ orderID, payway });
        console.warn(state);
        if (state === 'PAID') {
          this.$notify.success({
            title: '您的订单支付成功！',
            message: '您可前往打印点自行领取，或是等候支持的商家配送打印文件。'
          });
          this.$emit('paid');
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import './pay-dialog'
</style>
