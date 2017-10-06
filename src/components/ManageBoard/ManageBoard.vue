<template>
  <div class="manage-board">
    <div class="infom">
      <div class="inform-header">
        <slot name="header">
          <h1>通知消息</h1>
        </slot>
      </div>
      <div class="container">
        <slot>
          <div class="empty-tip"> 啦啦~ 这里没有消息哦 O(∩_∩)O </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'manage-board',
    props: {},
    data () {
      return {}
    },
    methods: {

    },
    computed: {},
    components: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import './manage-board'
</style>
