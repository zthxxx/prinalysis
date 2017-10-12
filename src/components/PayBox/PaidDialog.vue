<template>
  <div class="pay-modal">
    <header>订单支付</header>
    <div class="paid">
      <div class="tip">
        <div class="pay-success">
          <i class="el-icon-fa-check"></i>
          已成功支付{{money}}，感谢支持知书
        </div>
        <div class="detail">（自取模式凭订单码即可到打印点取件，配送模式请等待商家配送）</div>
        <div class="footer">
          <router-link :to="{path: '/user/order'}">
            <el-button type="primary" class="order" @click="confirm">查看订单详情</el-button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'paid-dialog',
  props: {
    money: {
      required: true,
      type: String
    },
    confirm: {
      required: true,
      type: Function
    }
  },
  data () {
    return {};
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import './pay-dialog'
  @import './paid-dialog'
</style>
