<template>
  <div class="spinning">
    <span class="spin-dot" :style="{width: sizePx, height: sizePx}"></span>
  </div>
</template>

<script>
  export default {
    name: 'spin-dot',
    props: {
      size: {
        type: Number,
        default: 32
      }
    },
    data () {
      return {}
    },
    computed: {
      sizePx () {
        return `${this.size}px`
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import './spin-dot'
</style>
