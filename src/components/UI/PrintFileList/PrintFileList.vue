<template>
  <article class="print-file-list">
    <print-file-item v-for="(file, index) in fileList"
                     :key="`${file.name}_${index}`"
                     :index="index + 1"
                     :file="file"
                     :preSetting="file.print"
                     :price="point && point.price"
                     @update="updateSetting"
                     :handleRemove="handleRemove"
                     :handlePreview="handlePreview">
    </print-file-item>
  </article>
</template>

<script>
  import printFileItem from '$@/UI/PrintFileItem';

  export default {
    name: 'print-file-list',
    components: { printFileItem },
    props: {
      point: {
        required: false,
        default: null
      },
      fileList: {
        type: Array,
        required: true
      },
      updateSetting: {
        type: Function,
        default: () => {}
      },
      handleRemove: {
        type: Function,
        required: true
      },
      handlePreview: {
        type: Function,
        required: true
      }
    },
    data () {
      return {};
    }
  };
</script>

