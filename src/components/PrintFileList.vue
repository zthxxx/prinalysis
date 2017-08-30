<template>
  <div class="PrintFileList">
      <print-file-item v-for="(file, index) in fileList"
        :index="index"
        :file="file"
        v-model="file.raw.printSetting"
        :key="`${file.name}_${index}`"
        :price="point.price"
        :handleRemove="handleRemove"
        :handlePreview="handlePreview">
      </print-file-item>
  </div>
</template>

<script>
  import printFileItem from './PrintFileItem'
  export default {
    name: 'print-file-list',
    props: {
      point: {
        required: true,
        default: null
      },
      fileList: {
        type: Array,
        required: true
      },
      handleRemove: {
        type: Function,
        required: true
      }
    },
    data () {
      return {}
    },
    methods: {
      handlePreview (file) {
        console.warn('handlePreview', file);
      }
    },
    components: {printFileItem}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
