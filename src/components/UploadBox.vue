<template>
  <div class="upload-box-out">
    <upload-drag-box @file="transmitFile">
      <print-file-list></print-file-list>
      <div class="tip">
        请从本地上传文件 或
        <router-link :to="{name: 'library'}">
          <span class="to-library">从校园文库添加文件</span>
        </router-link>
      </div>
      <el-upload multiple class="upload" ref="uploader"
                 action="https://jsonplaceholder.typicode.com/posts/">
        <div class="uploadBtn">
          <span class="upload_title">添加文件</span>
          <br>
          <span class="upload_text">点击按钮或者把文件拖放到这里</span>
        </div>
        <div class="el-upload__tip" slot="tip">已支持的格式：doc, docx, pdf, ppt, pptx, jpg, png</div>
      </el-upload>
    </upload-drag-box>
  </div>
</template>

<script>
  import uploadDragBox from './UploadDragBox'
  import printFileList from './PrintFileList'
  export default {
    name: 'upload-box',
    data () {
      return {}
    },
    methods: {
      transmitFile (files) {
        this.$refs.uploader.$refs['upload-inner'].uploadFiles(files);
      }
    },
    components: {uploadDragBox, printFileList}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../style/_variables"
  .upload-box-out
    text-align: center
    position: relative

  .to-library
    color: theme-green-dark
    &:hover
      color: darken(theme-green, 15%)

  .uploadBtn
    width: 232px
    height: 61px
    padding: 5px
    margin: 20px auto
    color: #fff
    background-color: dark-blue
    border-radius: 5px
    transition: all .2s ease-out
    font-size: 20px
    .upload_title
      font-size: 18px
    .upload_text
      font-size: 12px
      margin-top: 20px
      color: rgba(#fff, 0.65)

</style>
