<template>
  <div class="left-bar">
    <div class="head">
      <div class="left">
        <img :src="user.avatar" alt="avatar">
      </div>
      <div class="name">
        <div class="nickname">{{user.nickname}}</div>
      </div>
    </div>
    <div class="tabs">
      <el-menu :default-active="navIndex" class="items" router>
        <el-menu-item index="/user/order" class="tab-item">我的订单</el-menu-item>
        <el-menu-item index="/library/collection" class="tab-item">我的收藏</el-menu-item>
        <el-menu-item index="/library/share" class="tab-item">分享中心</el-menu-item>
        <el-menu-item index="/user/coupon" class="tab-item">优惠券</el-menu-item>
        <el-menu-item index="/user/notify" class="tab-item">系统通知</el-menu-item>
        <el-menu-item index="/user/info" class="tab-item">我的信息</el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'user-left-bar',
    props: {
      user: {
        required: true,
        default: ()=>({})
      }
    },
    data () {
      return {}
    },
    methods: {},
    computed: {
      navIndex () {
        return this.$route.path;
      }
    },
    components: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import './user-left-bar'
</style>
