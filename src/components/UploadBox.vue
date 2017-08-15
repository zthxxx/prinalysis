<template>
  <div class="upload-box-out">
    <upload-drag-box @file="transmitFile">
      <el-upload ref="uploader" multiple action="https://jsonplaceholder.typicode.com/posts/">
        <div class="uploadBtn">
          <span class="upload_title"> 添加文件 </span><br>
          <span class="upload_text">点击按钮或者把文件拖放到这里</span>
        </div>
      </el-upload>
    </upload-drag-box>
  </div>
</template>

<script>
  import uploadDragBox from './UploadDragBox.vue'
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
    components: {uploadDragBox}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../style/_variables'
  @import '../style/_animate'
  .upload-box-out
    text-align: center
    position: relative

  .el-upload-dragger
    width: 100%
    height-min: 260px
    border: none
    cursor: default
    background-color: transparent
    text-align:center
    display: inline-block
    &.is-dragover
      position: relative
      &::before
        top: 0
        left: 0
        width: 100%
        height: 100%
        padding-top:20px
        position: absolute
        background: rgba(theme-green-light, .6)
        content: "释放即可添加文件"
        z-index:1000
        color: #096
        font-size: 24px
        text-align: center
        box-sizing: border-box
        border:2px dashed color-theme
        animation: fadeIn .3s ease-out

  .uploadBtn
    width: 232px
    height: 61px
    padding: 5px
    border-radius: 5px
    margin: 20px auto
    background-color: dark-blue
    color: #fff
    cursor: pointer
    transition: all .2s ease-out
    .upload_title
      font-size: 18px
    .upload_text
      font-size: 12px
      color: rgba(#fff, 0.65)
</style>
