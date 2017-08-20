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
            <tr v-for="item in bills" v-if="item.unitPrice && item.count">
              <td>{{item.itemName}}</td>
              <td>{{item.unitPrice}}</td>
              <td>{{item.count}}</td>
              <td>{{item.money}}</td>
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
          <el-radio-group v-model="dispatching.take">
            <el-radio class="radio" label="pick">到打印点自取</el-radio>
            <br>
            <el-radio class="radio" label="dispatch" :disabled="!point.delivery_scope">送件上门（本打印点暂时不支持）</el-radio>
          </el-radio-group>
          <div class="dispatch-info"></div>
        </div>
        <div class="account-info">
          <div class="original-money">原价：<span>{{finalMoney.originMoney}}</span></div>
          <div class="final-money">应付：<span>{{finalMoney.actualMoney}}</span></div>
          <el-button class="to-submit">确认下单</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'settle-bill',
    props: {
      pointAddress: {
        type: Array,
        required: true
      },
      point: {
        required: true,
        default: null
      },
      fileList: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        dispatching: {
          take: 'pick',
          username: '',
          userPhone: '',
          address: '',
          leftMessage: ''
        },
        itemNameMap: {
          monoSingle: 'A4黑白单面 普通纸',
          monoDuplex: 'A4黑白双面 普通纸',
          colorfulSingle: 'A4彩色单面 普通纸',
          colorfulDuplex: 'A4彩色双面 普通纸',
          monoSingleThick: 'A4黑白单面 加厚纸',
          monoDuplexThick: 'A4黑白双面 加厚纸',
          colorfulSingleThick: 'A4彩色单面 加厚纸',
          colorfulDuplexThick: 'A4黑白双面 加厚纸',
        },
        formatCNY: (cents) => new Intl.NumberFormat('zh-CN',
          {style: 'currency', currency: 'CNY'}).format(cents / 100)
      }
    },
    methods: {
      getReducedMoney () {
        return {money:0, hasReduced: false};
      },
      getSelectCoupon () {
        return {couponId: null, couponName: null};
      },
      checkoutInfo () {
        let check = {
          Info: {
            orderType: this.point.pointType[0],
            money: this.finalMoney.amount,
            pointId: this.point.pointId,
            couponId: 0,
            city: this.pointAddress[0],
            school: this.pointAddress[1],
            campus: this.pointAddress[2],
            files: this.fileList.map(({raw: file}) => ({
              fileId: file.md5,
              fileName: file.name,
              ...file.printSetting
            })),
            reduction: {
              newUser: false,
              full: []
            },
            dispatchingInfo: {
              username: '',
              userPhone: '',
              address: '',
              leftMessage: ''
            }
          }
        };
        return check;
      }
    },
    computed: {
      itemCount () {
        let itemCount = {
          monoSingle: 0,
          monoDuplex: 0,
          colorfulSingle: 0,
          colorfulDuplex: 0,
        };
        for (let file of this.fileList) {
          let setting = file.raw.printSetting;
          let singleCount = 0;
          let dualCount = 0;
          let area = setting.endPage - setting.startPage + 1;
          let pages = Math.ceil(area / setting.layout);
          if (setting.duplex == 1) {
            singleCount = pages * setting.copies;
          } else if (setting.duplex == 2) {
            singleCount = pages % 2 * setting.copies;
            dualCount = Math.floor(pages / 2) * setting.copies;
          }
          itemCount[`${setting.color}Single`] += singleCount;
          itemCount[`${setting.color}Duplex`] += dualCount;
        }
        return itemCount;
      },
      bills () {
        let bills = [];
        let printItem = this.point.basicPrintItem;
        let unitPrice = (value) => value > 0 ? `${this.formatCNY(value)}/张` : null;
        for (let item of Object.keys(this.itemCount)) {
          bills.push({
            itemName: this.itemNameMap[item],
            unitPrice: unitPrice(printItem[item]),
            count: this.itemCount[item],
            money: this.formatCNY(printItem[item] * this.itemCount[item]),
            cost: printItem[item] * this.itemCount[item]
          })
        }
        return bills;
      },
      finalMoney () {
        let originCost = 0;
        let actualCost;
        let reduce = this.getReducedMoney();
//        let coupon = this.getSelectCoupon();
        for (let item of this.bills) {
          originCost += item.cost
        }
        actualCost = originCost;
        if (reduce.hasReduced) actualCost -= reduce.money;
        // TODO: handle selected coupon
        actualCost = actualCost < this.point.minCharge ? this.point.minCharge : actualCost;
        return {
          originMoney: this.formatCNY(originCost),
          actualMoney: this.formatCNY(actualCost),
          amount: actualCost
        };
      }
    }
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
