<template>
  <transition name="float-fade">
    <orderDetail v-if="order" :order="order" @back="onback" @update="checkOrder"></orderDetail>
    <div v-else>
      <el-menu :default-active="type" class="selector-tabs" mode="horizontal" @select="handleSelect">
        <el-menu-item index="ALL" class="selector-item">全部订单({{`${amount.ALL}`}})</el-menu-item>
        <el-menu-item index="PAYING" class="selector-item">待支付({{`${amount.PAYING}`}})</el-menu-item>
        <el-menu-item index="PAID" class="selector-item">待打印({{`${amount.PAID}`}})</el-menu-item>
        <el-menu-item index="PRINTED" class="selector-item">待收/取件({{`${amount.PRINTED}`}})</el-menu-item>
        <el-menu-item index="FINISH" class="selector-item">已完成({{`${amount.FINISH}`}})</el-menu-item>
        <el-menu-item index="REFUND" class="selector-item">退款({{`${amount.REFUND}`}})</el-menu-item>
      </el-menu>
      <div class="infom-list">
        <orderItem v-for="order of orders" :key="order.orderID"
                   :order="order"
                   @selected="checkOrder">
        </orderItem>
      </div>
      <div class="pages">
        <span class="infom-count">每页{{pageSize}}条消息，共{{amount[type]}}条消息</span>
        <el-pagination class="pagination" small
                       layout="prev, pager, next"
                       :page-size="pageSize"
                       :current-page.sync="page"
                       :total="amount[type]"
                       @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>
  </transition>
</template>

<script>
  import { getOrder, amountOrders, getOrders } from '@/api';
  import orderItem from './OrderItem';
  import orderDetail from './OrderDetail';

  export default {
    name: 'order-list',
    header: '我的订单',
    components: { orderItem, orderDetail },
    data () {
      return {
        amount: {
          ALL: 0,
          PAYING: 0,
          PAID: 0,
          PRINTED: 0,
          FINISH: 0,
          REFUND: 0
        },
        pageSize: 5,
        page: 1,
        type: 'ALL',
        orders: [],
        order: null
      };
    },
    async created () {
      this.amount = await amountOrders();
      this.getOrders();
    },
    methods: {
      async getOrders () {
        this.orders = await getOrders({
          limits: this.pageSize,
          page: this.page,
          type: this.type
        });
      },
      handleSelect (type) {
        this.page = 1;
        this.type = type;
        this.getOrders();
      },
      handleCurrentChange (page) {
        this.getOrders();
      },
      async checkOrder (orderID) {
        let order = await getOrder({ orderID });
        this.order = order;
      },
      onback () {
        this.order = null;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../manage-board'
</style>
