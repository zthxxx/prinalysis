<template>
  <div class="spinning">
    <span class="spin-dot"></span>
  </div>
</template>

<script>
  export default {
    name: 'spin-dot',
    data () {
      return {}
    },
    methods: {},
    components: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../style/_variables'
  @import '../style/_animate'
  .spinning
    opacity: 1
    position: static
    visibility: visible
    .spin-dot
      position: relative
      display: inline-block
      vertical-align: middle
      text-align: center
      width: 32px
      height: 32px
      &:after, &:before
        content: ""
        display: block
        position: absolute
        top: 0
        left: 0
        bottom: 0
        right: 0
        border-radius: 50%
        background-color: light-blue
        opacity: .6
        animation: spin-bounce 2.4s infinite ease-in-out
      &:after
        animation-delay: -1.2s
</style>
