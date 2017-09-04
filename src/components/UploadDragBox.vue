<template>
  <div
    class="upload-dragger"
    :class="{
      'dragover': dragover
    }"
    @drop.prevent.stop="onDrop"
    @dragover.prevent="onDragover"
    @dragleave.prevent.stop.self="dragover = false"
  >
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'upload-drag-box',
    props: {
      disabled: Boolean
    },
    data() {
      return {
        dragover: false
      };
    },
    methods: {
      onDragover () {
        if (!this.disabled) {
          this.dragover = true;
        }
      },
      onDrop (e) {
        if (!this.disabled) {
          this.dragover = false;
          this.$emit('file', e.dataTransfer.files);
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../style/_variables"
  @import "../style/_animate"
  .upload-dragger
    width: 100%
    height: auto
    padding: 20px 0
    box-sizing: border-box
    cursor: default
    background-color: transparent
    text-align: center
    display: inline-block
    position: relative
    &.dragover
      position: relative
      &::before
        top: 0
        left: 0
        width: 100%
        height: 100%
        padding-top: 20px
        position: absolute
        background: rgba(theme-green-light, .6)
        content: "释放即可添加文件"
        z-index: 1000
        color: #096
        font-size: 24px
        text-align: center
        box-sizing: border-box
        border: 2px dashed color-theme
        border-radius: 6px
        animation: fade-in .3s ease-out
</style>
