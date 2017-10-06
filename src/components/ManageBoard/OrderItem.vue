<template>
  <div class="infom-item" @click="select">
    <span class="item-icon"><i class="el-icon-fa-file-text-o"></i></span>
    <span class="item-info">
      <div class="file-info">
        <span class="tag gray">{{state}}</span>
        <span class="point-name">{{order.pointName}}</span>
        <span class="date">{{date}}</span>
      </div>
      <div class="file-content">
        <span class="file-count">文件个数： {{order.fileCount}}</span>
        <span class="first-file-name">包含文件：「{{filename}}」等</span>
      </div>
    </span>
    <span class="item-count">{{money}}</span>
  </div>
</template>

<script>
  import moment from 'moment'
  import {formatCNY} from '@/utils/tools'
  export default {
    name: 'order-item',
    props: {
      order: {
        required: true
      }
    },
    data () {
      return {
        stateMap: {
          PAYING: '待支付',
          PAID: '已支付',
          PRINTED: '待取件',
          FINISH: '已取件',
          CANCEL: '已取消',
          REFUNDING: '待退款',
          REFUNDED: '已退款'
        }
      }
    },
    methods: {
      select () {
        this.$emit('selected', this.order.orderID);
      }
    },
    computed: {
      state () {
        return this.stateMap[this.order.state];
      },
      date () {
        return moment(Number(this.order.orderDate)).format('YYYY-MM-DD HH:MM');
      },
      money () {
        return formatCNY(this.order.money);
      },
      filename () {
        return this.order.filePrename.slice(0, 15);
      }
    },
    components: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import './order-item'
</style>
