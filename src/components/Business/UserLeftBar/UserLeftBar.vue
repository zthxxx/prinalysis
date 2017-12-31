<template>
  <div class="left-bar">
    <div class="head">
      <figure>
        <img class="avatar" :src="user && user.avatar" alt="avatar">
        <figcaption class="name">
          <div class="nickname">{{user && user.nickname}}</div>
        </figcaption>
      </figure>
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
        default: () => ({})
      }
    },
    data () {
      return {}
    },
    computed: {
      navIndex () {
        return this.$route.path.match(/^(\/user\/[^\/]*)/)[1]
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import './user-left-bar'
</style>
