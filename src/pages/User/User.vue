<template>
  <div class="content">
    <div class="user">
      <userLeftBar :user="user"></userLeftBar>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import userLeftBar from '@/components/UserLeftBar'
  export default {
    name: 'user',
    data () {
      return {}
    },
    methods: {},
    computed: {
      ...mapState('user', ['user']),
    },
    components: {userLeftBar}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import './user'
</style>
