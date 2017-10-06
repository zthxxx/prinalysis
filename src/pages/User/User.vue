<template>
  <transition name="float-fade">
    <div class="content" key="user">
      <div class="user">
        <user-left-bar :user="user"></user-left-bar>
        <manage-board>
          <h1 slot="header">{{$route.meta.header}}</h1>
          <router-view></router-view>
        </manage-board>
      </div>
    </div>
  </transition>
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
