<template>
  <div id="app">
    <headerTop></headerTop>
    <el-row type="flex" justify="center">
      <el-col :span="24">
        <router-view></router-view>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import headerTop from '@/components/HeaderTop'
  export default {
    data () {
      return {}
    },
    components: {headerTop}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "/style/_common"
</style>
