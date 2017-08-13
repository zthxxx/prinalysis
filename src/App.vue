<template>
  <div id="app">
    <header-top></header-top>
    <router-view></router-view>
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
