<template>
  <article class="order-detail">
    <el-button type="text" icon="fa-chevron-left" class="back" @click="back">返回</el-button>
    <section class="overview">
      <header class="over-title">订单概况</header>
      <div>
        <ul class="overview-info">
          <li>
            <span>订单金额：</span><span class="over-money">{{amount}}</span>
          </li>
          <li>
            <span>订单状态：</span><span class="order-state"
                                    :class="order.state==='PAYING' ? 'orange' : 'gray'">{{state}}</span>
          </li>
          <li>
            <span>支付方式：</span><span>{{payway}}</span>
          </li>
          <li>
            <span>下单打印点：</span>
            <span>{{order.pointName}}
              &nbsp;<i class="el-icon-fa-phone"></i>&nbsp;
              ({{pointPhone}})
            </span>
          </li>
          <li>
            <span>取件方式：</span><span>{{takeway}}</span>
          </li>
        </ul>
        <ul class="overview-info">
          <li>
            <span>订单编号：</span><span>{{order.orderID}}</span>
          </li>
          <li>
            <span>下单时间：</span><span>{{orderDate}}</span>
          </li>
          <li>
            <span>支付时间：</span><span>{{payDate}}</span>
          </li>
          <li>
            <span>打印时间：</span><span>{{printDate}}</span>
          </li>
          <li v-if="dispatch">
            <span>配送地址：</span><span>{{dispatch}}</span>
          </li>
        </ul>
      </div>
      <div class="overview-inform" v-if="inform[order.state]">
        {{inform[order.state]}}
      </div>
      <div class="overview-inform" v-if="order.state === 'PAYING'">
        <el-button class="paying" @click="paying">立即支付</el-button>
        <el-button class="cancel" @click="cancel">取消订单</el-button>
      </div>
    </section>
    <section class="content">
      <header class="over-title">订单内容</header>
      <div class="content-detail">
        <div class="content-line line-header">
          <span class="item-index">序号</span>
          <span class="item-name">文件名</span>
          <span class="item-pages">页数</span>
          <span class="item-layer">多合一</span>
          <span class="item-paper">纸张</span>
          <span class="item-color">颜色</span>
          <span class="item-side">单双面</span>
          <span class="item-copies">份数</span>
          <span class="item-operation">操作</span>
        </div>
        <div class="content-line" v-for="(file, index) of order.files" :key="file.fileID">
          <span class="item-index">{{index + 1}}</span>
          <span class="item-name">{{file.fileName}}</span>
          <span class="item-pages">{{file.endPage - file.startPage + 1}}</span>
          <span class="item-layer">{{file.row * file.col}}</span>
          <span class="item-paper">{{`${file.size} ${file.caliper} 纸`}}</span>
          <span class="item-color">{{printTypeMap[file.color]}}</span>
          <span class="item-side">{{printTypeMap[file.side]}}</span>
          <span class="item-copies">{{file.copies}}</span>
          <span class="item-operation" v-if="file.downloadable">
            <a :href="file.downloadUrl" class="download">下载文件</a>
          </span>
          <span class="item-operation over-none" v-else>不可下载</span>
        </div>
      </div>
    </section>
    <section class="content">
      <header class="over-title">结算信息</header>
      <div class="content-detail">
        <div class="content-line line-header">
          <span class="item-field">条目</span>
          <span class="item-unit">单价</span>
          <span class="item-count">数量</span>
          <span class="item-amount">小计</span>
        </div>
        <div class="content-line" v-for="(bill, index) of order.settle" :key="index">
          <span class="item-field">{{getBillingItem(bill)}}</span>
          <span class="item-unit">{{formatCNY(bill.unit)}}</span>
          <span class="item-count">{{bill.count}}</span>
          <span class="item-amount">{{formatCNY(bill.unit * bill.count)}}</span>
        </div>
      </div>
      <div class="bill-amount">
        <p class="money-bottom">
          <span>合计：</span>
          <span class="over-money">{{amount}}</span>
        </p>
      </div>
    </section>
  </article>
</template>

<script>
  import _ from 'lodash';
  import { POPUP_PAY } from '$@/Popups';
  import { cancelOrder } from '@/api';
  import { formatCNY, formatTime, orderStateMap, printTypeMap, getBillingItem } from '@/utils/tools';

  export default {
    name: 'order-detail',
    props: {
      order: {
        required: true
      }
    },
    data () {
      return {
        formatCNY,
        printTypeMap,
        getBillingItem,
        paywayMap: {
          WXPAY: '微信',
          ALIPAY: '支付宝'
        },
        inform: {
          PRINTED: '自取模式凭订单码即可到打印点取件，配送模式请等待商家配送',
          REFUNDING: '温馨提示：该订单已取消并正在退款，退款将在2个工作日内退回到支付账户'
        }
      };
    },
    computed: {
      amount () {
        return formatCNY(this.order.money);
      },
      orderDate () {
        return formatTime(this.order.orderDate);
      },
      payDate () {
        return this.order.payDate ? formatTime(this.order.payDate) : '待支付';
      },
      payway () {
        return this.order.payDate ? this.paywayMap[this.order.payway] : '无';
      },
      printDate () {
        return this.order.printDate ? formatTime(this.order.printDate) : '待打印';
      },
      state () {
        return orderStateMap[this.order.state];
      },
      pointPhone () {
        return _.get(this.order, 'pointPhone', '(无)');
      },
      takeway () {
        let { dispatching } = this.order;
        if (_.isEmpty(dispatching)) {
          return '刷票自取';
        }
        return '店家配送';
      },
      dispatch () {
        let { dispatching } = this.order;
        if (!_.isEmpty(dispatching)) {
          let { phone, address } = dispatching;
          return [phone, address].join(' ');
        }
        return null;
      }
    },
    methods: {
      back () {
        this.$emit('back');
      },
      async paying () {
        let { orderID, money } = this.order;
        await this[POPUP_PAY]({ orderID, money });
        this.$emit('update', orderID);
      },
      async cancel () {
        let { orderID } = this.order;
        await cancelOrder({ orderID });
        this.$emit('update', orderID);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import './order-detail'
</style>
