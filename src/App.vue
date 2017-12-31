<template>
  <main id="app">
    <header-top></header-top>
    <router-view></router-view>
  </main>
</template>

<script>
  import * as types from '@/store/mutation-types'
  import { checkLogin } from '@/api'
  import headerTop from '$@/Business/HeaderTop'
  import { mapModel } from '@/utils/tools'

  export default {
    name: 'app',
    components: { headerTop },
    data () {
      return {}
    },
    computed: {
      ...mapModel('user', { user: types.SET_USER })
    },
    created () {
      this.initData()
    },
    methods: {
      async initData () {
        let state = await checkLogin()
        this.user = state instanceof Object ? state : null
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~@/style/_common"
  @import "~@/style/_elmui_custom"
</style>
