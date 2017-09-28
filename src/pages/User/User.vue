<template>
  <div class="content">
    <div class="user">
      <user-left-bar :user="user"></user-left-bar>
      <manage-board></manage-board>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import userLeftBar from '@/components/UserLeftBar'
  import manageBoard from '@/components/manageBoard'
  export default {
    name: 'user',
    data () {
      return {}
    },
    methods: {},
    computed: {
      ...mapState('user', ['user']),
    },
    components: {userLeftBar, manageBoard}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import './user'
</style>
