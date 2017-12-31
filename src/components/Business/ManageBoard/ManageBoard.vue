<template>
  <div class="manage-board">
    <header class="inform-header">
      <slot name="header">
        <h1>通知消息</h1>
      </slot>
    </header>
    <article class="inform-container">
      <slot>
        <footer class="empty-tip"> 啦啦~ 这里没有消息哦 O(∩_∩)O </footer>
      </slot>
    </article>
  </div>
</template>

<script>
  export default {
    name: 'manage-board',
    data () {
      return {}
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import './manage-board'
</style>
