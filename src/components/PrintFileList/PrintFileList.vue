<template>
  <div>
    <div class="PrintFileList">
        <print-file-item v-for="(file, index) in fileList"
          :key="`${file.name}_${index}`"
          :index="index + 1"
          :file="file"
          :preSetting="file.print"
          :price="point && point.price"
          :handleRemove="handleRemove"
          :handlePreview="handlePreview">
        </print-file-item>
    </div>
    <filePreview v-if="preview"
                  @close="preview = false"
                  :price="point && point.price"
                  :file="previewFile">
    </filePreview>
  </div>
</template>

<script>
  import printFileItem from './PrintFileItem'
  import filePreview from './FilePreview.vue'
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
      return {
        preview: false,
        previewFile: null
      }
    },
    methods: {
      handlePreview (file) {
        console.warn('handlePreview', file);
        this.previewFile = file;
        this.preview = true;
      }
    },
    components: {printFileItem, filePreview}
  }
</script>

