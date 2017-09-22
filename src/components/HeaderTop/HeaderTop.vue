<template>
  <header>
    <div class="container">
      <div class="left">
        <a href="/">
          <img :src="logo" alt="logo" class="nav-logo">
        </a>
        <el-menu :default-active="navIndex" class="nav-list" mode="horizontal" router>
          <el-menu-item index="home" class="nav-item">主页</el-menu-item>
          <el-menu-item index="print" class="nav-item">
            打印
            <span class="count" v-if="fileList.length">{{fileList.length}}</span>
          </el-menu-item>
          <el-menu-item index="library" class="nav-item">校园文库</el-menu-item>
          <el-menu-item index="contact" class="nav-item">联系我们</el-menu-item>
        </el-menu>
      </div>
      <div class="right">
        <el-button icon="fa-weixin" class="nav-item nav-button">微信登录</el-button>
      </div>
    </div>
  </header>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'header-top',
    data () {
      return {
        logo: require('@/assets/img/logo.png')
      }
    },
    computed: {
      ...mapState('print', ['fileList']),
      navIndex: function () {
        return this.$route.path.replace('/', '');
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./header-top"
</style>
