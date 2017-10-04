<template>
  <transition name="fade">
    <preview-mask v-if="preview && file"
                  :price="price"
                  :file="file"
                  :update="updateSetting"
                  @close="close">
    </preview-mask>
  </transition>
</template>

<script>
  import previewMask from './PreviewMask.vue'
  export default {
    name: 'file-preview',
    props: {
      price: {
        type: null,
        default: null
      },
      file: {
        type: null,
        default: null
      },
      updateSetting: {
        type: Function,
        default: () => {}
      }
    },
    data () {
      return {
        preview: false
      }
    },
    methods: {
      open () {
        this.preview = true
      },
      close () {
        this.preview = false;
        this.$nextTick(this.$destroy);
      }
    },
    components: {previewMask}
  }
</script>

