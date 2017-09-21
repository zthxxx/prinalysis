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
  @import './settle-bill'
</style>
