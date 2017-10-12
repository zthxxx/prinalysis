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
    data () {
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
  @import "./upload-drag-box"
</style>
