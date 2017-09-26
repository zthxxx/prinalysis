<template>
  <div id="app">
    <header-top></header-top>
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import * as types from '@/store/mutation-types'
  import {checkLogin} from '@/api'
  import headerTop from '@/components/HeaderTop'
  export default {
    data () {
      return {}
    },
    mounted () {
      this.initData();
    },
    methods: {
      ...mapMutations('user', [types.SET_USER]),
      async initData () {
        let state = await checkLogin();
        if (state instanceof Object) {
          this[types.SET_USER](state);
        }
      }
    },
    components: {headerTop}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~@/style/_common"
  @import "~@/style/_elmui_custom"
</style>
