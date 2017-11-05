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
            <tr v-for="item in bills" v-if="item.unit && item.count" :key="item.name">
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
          <el-select class="coupon-select" value="" placeholder="暂无可使用的优惠券">
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
            <el-radio class="radio" :label="true"
                      :disabled="!point.delivery_scope || finalMoney.originMoney < point.dispatch.distributionStart">
              送件上门
              {{
                point.delivery_scope ?
                `（${formatCNY(point.dispatch.distributionStart)} 起送，配送费 ${formatCNY(point.dispatch.distributionCharge)}）` :
                '（本打印点暂时不支持）'
              }}
            </el-radio>
          </el-radio-group>
          <transition name="left-fade">
            <div class="dispatch" v-if="dispatch">
              <el-input v-model="dispatching.nickname" placeholder="请输入姓名" class="dispatch-info nickname"></el-input>
              <el-input v-model="dispatching.phone" placeholder="请输入手机号" class="dispatch-info phone"></el-input>
              <el-input v-model="dispatching.address" placeholder="请输入配送地址" class="dispatch-info address"></el-input>
              <el-input v-model="dispatching.message" placeholder="请输入留言" class="dispatch-info message"></el-input>
            </div>
          </transition>
        </div>
        <div class="account-info">
          <div class="original-money">原价：<span>{{formatCNY(finalMoney.originMoney)}}</span></div>
          <div class="final-money">应付：<span>{{formatCNY(finalMoney.amount)}}</span></div>
          <el-button class="to-submit" @click="verifyOrder">确认下单</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import _ from 'lodash';
  import { POPUP_LOGIN, POPUP_PAY } from '$@/Popups';
  import { verifyOrder } from '@/api';
  import { formatCNY, getBillingItem } from '@/utils/tools';

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
      },
      updateFiles: {
        type: Function
      }
    },
    data () {
      return {
        dispatch: false,
        dispatching: {
          nickname: '',
          phone: '',
          address: '',
          message: ''
        },
        formatCNY: formatCNY
      };
    },
    computed: {
      ...mapState('user', ['user']),
      bills () {
        let { items, units } = this.getItems();
        let bills = [];
        let unitPrice = value => (value > 0 ? `${formatCNY(value)}/张` : null);
        for (let item in items) {
          if (items[item] > 0) {
            let count = items[item];
            let unit = units[item];
            bills.push({
              name: item,
              unit: unitPrice(unit),
              count: count,
              cost: count * unit
            });
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
          originCost += item.cost;
        }
        actualCost = originCost;
        if (reduce.hasReduced) actualCost -= reduce.money;
        // TODO: handle selected coupon
        if (this.dispatch) {
          actualCost += this.point.dispatch.distributionCharge;
        }
        actualCost = actualCost < this.point.minCharge ? this.point.minCharge : actualCost;
        return {
          originMoney: originCost,
          amount: actualCost
        };
      }
    },
    watch: {
      user: {
        handler ({ nickname, username, address }) {
          this.dispatching = {
            ...this.dispatching,
            phone: username,
            nickname,
            address
          };
        }
      }
    },
    mounted () {
      if (this.user) {
        this.dispatching = {
          nickname: _.get(this.user, 'nickname'),
          phone: _.get(this.user, 'username'),
          address: _.get(this.user, 'address'),
          message: ''
        };
      }
    },
    methods: {
      getReducedMoney () {
        return { money: 0, hasReduced: false };
      },
      getSelectCoupon () {
        return { couponId: null, couponName: null };
      },
      calcSidesCount (setting) {
        let oneside = 0;
        let duplex = 0;
        let area = setting.endPage - setting.startPage + 1;
        let layout = setting.row * setting.col;
        let pages = Math.ceil(area / layout);
        if (setting.side === 1) {
          oneside += pages;
        } else if (setting.side === 2) {
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
        const price = this.point.price;
        for (let file of this.fileList) {
          if (!file.print) continue;
          if (file.status !== 'success') continue;
          let setting = file.print;
          let { size, caliper, color } = setting;
          let sides = _.get(_.find(price, { size, caliper }), ['money', color]);
          if (!sides) return { items: {}, units: {} };
          let prefix = side => getBillingItem({ size, caliper, color, side });
          let oddType = prefix(1);
          let evenType = prefix(2);
          let [oneside, duplex] = this.calcSidesCount(setting);
          let isOnesideExist = 'oneside' in sides ? oddType : evenType;
          items[isOnesideExist] = _.get(items, isOnesideExist, 0) + oneside;
          items[evenType] = _.get(items, evenType, 0) + duplex;
          units[oddType] = _.get(sides, 'oneside', 0);
          units[evenType] = _.get(sides, 'duplex', 0);
        }
        return { items, units };
      },
      getOrder () {
        let order = {
          pointID: this.point.id,
          files: this.fileList.map(file => ({
            fileID: file.raw.md5,
            fileName: file.name,
            ...file.print
          })),
          money: this.finalMoney.amount,
        };
        if (this.dispatch) {
          order.dispatching = this.dispatching;
        }
        return order;
      },
      async verifyOrder () {
        if (!this.user) {
          await this[POPUP_LOGIN]();
        }
        let order = this.getOrder();
        let { orderID } = await verifyOrder(order);
        await this[POPUP_PAY]({
          orderID,
          money: formatCNY(this.finalMoney.amount)
        });
        this.paidRefresh();
      },
      paidRefresh () {
        this.updateFiles([]);
        this.$router.push({ name: 'user-order' });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import './settle-bill'
</style>

<style lang="stylus" rel="stylesheet/stylus">
  .dispatch
    .dispatch-info input
      text-align: start
</style>
