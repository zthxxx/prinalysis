<template>
  <div>
    <transition name="fade">
      <preview-mask v-if="preview && file"
                    v-model="preview"
                    :price="price"
                    :file="file"
                    :update="updateSetting">
      </preview-mask>
    </transition>
  </div>
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
      }
    },
    components: {previewMask}
  }
</script>

