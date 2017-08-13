<template>
  <header>
    <div class="container">
      <div class="left">
        <a href="/">
          <img src="../assets/img/logo.png" alt="logo" class="nav-logo">
        </a>
        <el-menu :default-active="navIndex" class="nav-list" mode="horizontal" router>
          <el-menu-item index="home" class="nav-item">主页</el-menu-item>
          <el-menu-item index="print" class="nav-item">打印</el-menu-item>
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
  export default {
    name: 'header-top',
    data () {
      return {
      }
    },
    computed: {
      navIndex: function(){
        return this.$route.path.replace('/', '');
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../style/_variables"

  $head-hight = 60px

  header
    height: $head-hight
    position: relative
    width: 100%
    top: 0
    left: 0
    padding: 0 20px
    z-index: 100
    color: #fff;
    box-sizing: border-box
    background-color: color-theme

  .container
    width: 1140px
    margin: 0 auto
    padding: 0 30px
    height: 100%
    box-sizing: border-box

  .nav-logo
    height: $head-hight
    width: auto
    vertical-align: sub

  .nav-list
    height: 100%
    float: right
    padding-left: 20px
    background-color: color-theme

  .nav-item
    margin: 0 10px
    padding: 0 18px
    display: inline-block
    height: $head-hight
    line-height: $head-hight
    color: #fff
    font-size: 16px
    text-align: center
    background-color: color-theme
    transition: border-color .3s,background-color .3s,color .3s;
    &:hover, &.is-active:hover
      background-color: rgba(0,0,0,.05)
    &.is-active
      background-color: rgba(0,0,0,.1)
      border-bottom: 5px solid #0d6

  .nav-button
    border: none

  .left
    float: left

  .right
    float: right
</style>
