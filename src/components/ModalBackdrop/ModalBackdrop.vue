<template>
  <transition name="fade">
    <div class="modal-wrapper">
      <div class="modal-backdrop"></div>
      <div class="modal-dialog">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'modal-backdrop',
    data () {
      return {};
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import './modal-backdrop'
</style>
