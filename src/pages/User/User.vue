<template>
  <transition name="float-fade">
    <article class="content" key="user">
      <user-left-bar :user="user"></user-left-bar>
      <manage-board>
        <h1 slot="header">{{$route.meta.header}}</h1>
        <router-view></router-view>
      </manage-board>
    </article>
  </transition>
</template>

<script>
  import { mapState } from 'vuex'
  import userLeftBar from '$@/Business/UserLeftBar'
  import manageBoard from '$@/Business/ManageBoard'

  export default {
    name: 'user',
    components: { userLeftBar, manageBoard },
    data () {
      return {}
    },
    computed: {
      ...mapState('user', ['user'])
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import './user'
</style>
