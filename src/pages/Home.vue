<template>
  <div class="content container">
    <div class="index">
      <div class="banner">
        <img src="../assets/home-banner.jpg" alt="">
        <div class="float-div">
          <div class="div-center">
            <el-button type="primary" class="print" size="large">立即打印</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data () {
      return {}
    },
    methods: {},
    components: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../style/_variables"
  .content
    width: 1080px
    margin: 0 auto

  .index
    min-width: 1200px
    width: 100%
    position: absolute
    background-color: #fff
    left: 0

  .banner
    position: relative
    text-align: center
    background-color: color-banner-back
    overflow: hidden
    img
      width: 100%
      height: auto

  .float-div
    text-align: left
    width: 100%
    position: absolute
    left: 0
    top: 0
    .div-center
      width: 500px
      margin: 0 auto
      position: relative
      text-align: center
      padding-top: 300px

  .print
    padding: 16px 28px
    font-size: 18px
    border-radius: 28px
    border: 1px solid deep-black
    cursor: pointer
    background-color: transparent
    color: deep-black
    transition: border-color .3s, background-color .3s, color .3s;
    &:hover
      color: #fff
      border: 1px solid color-theme
      background-color: color-theme

</style>
