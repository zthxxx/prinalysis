<template>
  <div class="account">
    <div class="print-project">
      <div class="left-part">
        <div class="print-place">
          <span class="title">打印点：</span><span class="place-name">示例打印点</span>
        </div>
        <div class="project">
          <table class="project-account">
            <tbody>
            <tr>
              <td>计费项目</td>
              <td>单价</td>
              <td>数量</td>
              <td>小计</td>
            </tr>
            <tr v-for="item in bills" v-if="item.unit && item.count">
              <td>{{item.name}}</td>
              <td>{{item.unit}}</td>
              <td>{{item.count}}</td>
              <td>{{formatCNY(item.cost)}}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="coupon">
          使用优惠券：
          <el-select class='coupon-select' value="" placeholder="暂无可使用的优惠券">
          </el-select>
        </div>
      </div>
      <div class="right-part">
        <div class="top">
          <div class="title">
            选择取件方式
          </div>
          <el-radio-group v-model="dispatch">
            <el-radio class="radio" :label="false">到打印点自取</el-radio>
            <br>
            <el-radio class="radio" :label="true" :disabled="!point.delivery_scope">送件上门{{point.delivery_scope ? '' : '（本打印点暂时不支持）' }}</el-radio>
          </el-radio-group>
          <div class="dispatch-info"></div>
        </div>
        <div class="account-info">
          <div class="original-money">原价：<span>{{finalMoney.originMoney}}</span></div>
          <div class="final-money">应付：<span>{{finalMoney.actualMoney}}</span></div>
          <el-button class="to-submit" @click="verifyOrder()">确认下单</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import {formatCNY} from '@/utils/tools'
  import {verifyOrder} from '@/api'
  export default {
    name: 'settle-bill',
    props: {
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
        dispatch: false,
        dispatching: {
          username: '',
          userPhone: '',
          address: '',
          leftMessage: ''
        },
        typeMap: {
          mono: '黑白',
          colorful: '彩色',
          '1': '单面',
          '2': '双面'
        },
        formatCNY: formatCNY
      }
    },
    methods: {
      getReducedMoney () {
        return {money: 0, hasReduced: false};
      },
      getSelectCoupon () {
        return {couponId: null, couponName: null};
      },
      calcSidesCount (setting) {
        let oneside = 0;
        let duplex = 0;
        let area = setting.endPage - setting.startPage + 1;
        let layout = setting.row * setting.col;
        let pages = Math.ceil(area / layout);
        if (setting.side == 1) {
          oneside += pages;
        } else if (setting.side == 2) {
          oneside += pages % 2;
          duplex += Math.floor(pages / 2);
        }
        oneside *= setting.copies;
        duplex *= setting.copies;
        return [oneside, duplex];
      },
      getItems () {
        let items = {};
        let units = {};
        const typeMap = this.typeMap;
        const price = this.point.price;
        for (let file of this.fileList) {
          if (!file.print) continue;
          if (file.status !== 'success') continue;
          let setting = file.print;
          let {size, caliper, color} = setting;
          let sides = _.get(_.find(price, {size, caliper}), ['money', color]);
          if (!sides) return {items: {}, units: {}};
          let prefix = side => `${size} ${caliper}纸${typeMap[color]}${typeMap[side]}`;
          let oddType = prefix(1);
          let evenType = prefix(2);
          let [oneside, duplex] = this.calcSidesCount(setting);
          let isOnesideExist = 'oneside' in sides ? oddType : evenType;
          items[isOnesideExist] = _.get(items, isOnesideExist, 0) + oneside;
          items[evenType] = _.get(items, evenType, 0) + duplex;
          units[oddType] = _.get(sides, 'oneside', 0);
          units[evenType] = _.get(sides, 'duplex', 0);
        }
        return {items, units};
      },
      getOrder () {
        let order = {
          pointID: this.point.pointID,
          files: this.fileList.map((file) => ({
            fileID: file.raw.md5,
            fileName: file.name,
            ...file.print
          })),
          money: this.finalMoney.amount,
          couponId: 0,
          reduction: {
            newUser: false,
            full: []
          },
          dispatchingInfo: this.dispatch ? this.dispatching : {
            username: '',
            userPhone: '',
            address: '',
            leftMessage: ''
          }
        };
        return order;
      },
      async verifyOrder () {
        let order = this.getOrder();
        console.warn(order);
        let {orderID} = await verifyOrder(order);
        console.warn(orderID);
      }
    },
    computed: {
      bills () {
        let {items, units} = this.getItems();
        let bills = [];
        let unitPrice = value => value > 0 ? `${formatCNY(value)}/张` : null;
        for (let item in items) {
          if (items[item] > 0) {
            let count = items[item];
            let unit = units[item];
            bills.push({
              name: item,
              unit: unitPrice(unit),
              count: count,
              cost: count * unit
            })
          }
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
          originMoney: formatCNY(originCost),
          actualMoney: formatCNY(actualCost),
          amount: actualCost
        };
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../style/_variables'
  .account
    width: 100%
    height: auto
    color: shallow-text-gray
    padding-bottom: 20px
    font-size: 16px

  .print-project
    width: 960px
    margin: 0 auto 6px
    padding-top: 10px
    display: flex
    .left-part
      width: 53%
      padding-bottom: 6px
      padding-right: 3%
      .print-place
        left: 0
        margin-top: 12px
        .place-name
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
        .coupon-select
          width: 240px
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

  .project-account
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
