<template>
  <div class="manage-board">
    <div class="infom">
      <div class="inform-header">
        <h1>系统通知</h1>
      </div>
      <div class="container">
        <el-menu :default-active="activeTab" class="infom-tab" mode="horizontal" @select="handleSelect">
          <el-menu-item index="全部订单" class="select">全部订单(7)</el-menu-item>
          <el-menu-item index="待支付" class="select">待支付(0)</el-menu-item>
          <el-menu-item index="待打印" class="select">待打印(0)</el-menu-item>
          <el-menu-item index="待收/取件" class="select">待收/取件(0)</el-menu-item>
          <el-menu-item index="待收/取件" class="select">已完成(6)</el-menu-item>
          <el-menu-item index="退款" class="select">退款(1)</el-menu-item>
        </el-menu>
        <div class="infom-list">
          <orderItem></orderItem>
          <orderItem></orderItem>
          <orderItem></orderItem>
          <orderItem></orderItem>
          <!--<div class="empty-tip"> 啦啦~ 这里没有消息哦 O(∩_∩)O </div>-->
        </div>
        <div class="pages">
          <span class="infom-count">每页5条消息，共7个条消息</span>
          <el-pagination class="pagination" small
                         layout="prev, pager, next"
                         :total="50">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import orderItem from './OrderItem'
  export default {
    name: 'manage-board',
    props: {},
    data () {
      return {
        activeTab: '全部订单'
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.info(key, keyPath);
      }
    },
    computed: {},
    components: {orderItem}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import './manage-board'
</style>
