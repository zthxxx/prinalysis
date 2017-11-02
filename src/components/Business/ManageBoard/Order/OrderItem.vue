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
  import { formatCNY, formatTime, orderStateMap } from '@/utils/tools';

  export default {
    name: 'order-item',
    props: {
      order: {
        required: true
      }
    },
    data () {
      return {};
    },
    computed: {
      state () {
        return orderStateMap[this.order.state];
      },
      date () {
        return formatTime(this.order.orderDate);
      },
      money () {
        return formatCNY(this.order.money);
      },
      filename () {
        return this.order.filePrename.slice(0, 15);
      }
    },
    methods: {
      select () {
        this.$emit('selected', this.order.orderID);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import './order-item'
</style>
