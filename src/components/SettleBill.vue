<template>
  <div class="Account">
    <div class="printProject">
      <div class="left-part">
        <div class="printPlace">
          <span class="title">打印点：</span><span class="place_name">示例打印点</span>
        </div>
        <div class="project">
          <table class="projectAccount">
            <tbody>
            <tr>
              <td>计费项目</td>
              <td>单价</td>
              <td>数量</td>
              <td>小计</td>
            </tr>
            <tr>
              <td>A4黑白单面 普通纸</td>
              <td>0.10/张</td>
              <td>6</td>
              <td>0.60</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="coupon">
          使用优惠券：
          <el-select value="" style="width: 240px;" placeholder="暂无可使用的优惠券">
          </el-select>
        </div>
      </div>
      <div class="right-part">
        <div class="top">
          <div class="title">
            选择取件方式
          </div>
          <el-radio-group value="pick">
            <el-radio class="radio" label="pick">到打印点自取</el-radio>
            <br>
            <el-radio class="radio" label="dispatch" disabled>送件上门（本打印点暂时不支持）</el-radio>
          </el-radio-group>
          <div class="dispatch-info"></div>
        </div>
        <div class="account-info">
          <div class="original-money">原价：<span>￥ 0.60</span></div>
          <div class="final-money">应付：<span>￥ 0.60</span></div>
          <el-button class="to-submit">确认下单</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'settle-bill',
    data () {
      return {}
    },
    methods: {},
    components: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../style/_variables'
  .Account
    width: 100%
    height: auto
    color: shallow-text-gray
    padding-bottom: 20px
    font-size: 16px

  .printProject
    width: 960px
    margin: 0 auto 6px
    padding-top: 10px
    display: flex
    .left-part
      width: 53%
      padding-bottom: 6px
      padding-right: 3%
      .printPlace
        left: 0
        margin-top: 12px
        .place_name
          font-size: 16px
          font-weight: 600
          color: theme-green-dark
      .project
        display: block
        margin-bottom: 15px
      .coupon
        font-size: 13px
        display: flex
        align-items: center
        outline: none
        border: none
        background: none
    .right-part
      width: 48%
      min-height: 290px
      border-left: 1px solid #ddd
      padding: 8px 0 6px 26px
      display: flex
      flex-direction: column
      justify-content: space-between
      .title
        color: dark-blue
        margin-bottom: 4px
      .radio
        width: 100%
        display: flex
        align-items: center
        font-size: 15px
        padding: 4px 0

  .projectAccount
    margin-top: 12px
    width: 100%
    tr
      display: block
      border-bottom: 1px solid #ddd
      &:first-child td
        font-weight: 700
      td
        width: 200px
        height: 35px
        font-size: 14px
        &:first-child
          width: 300px

  .account-info
    text-align: right
    align-self: flex-end
    .original-money
      font-size: 15px
      margin-top: 20px
      color: #888
    .final-money
      font-size: 15px
      margin: 5px 0
      span
        font-size: 24px
        color: theme-green-dark
        margin-left: 12px
    .to-submit
      background: theme-green-dark
      outline: none
      border: none
      border-radius: 5px
      width: 150px
      height: 46px
      color: #fff
      margin-top: 7px
      font-size: 16px
</style>
