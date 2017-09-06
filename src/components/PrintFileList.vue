<template>
  <div>
    <div class="PrintFileList">
        <print-file-item v-for="(file, index) in fileList"
          :index="index"
          :file="file"
          v-model="file.raw.printSetting"
          :key="`${file.name}_${index}`"
          :price="point && point.price"
          :handleRemove="handleRemove"
          :handlePreview="handlePreview">
        </print-file-item>
    </div>
    <div class="preview" v-if="preview">
      <div class="center">
        <div class="page">
          <div class="page-list">
            <div>
              <img src="../assets/img/print/preview_test.png" class="gray">
            </div>
          </div>
        </div>
        <div class="file">
          <div class="close">
            <div class="content">
              <i class="el-icon-fa-compress close-btn" @click="preview = false"></i>
            </div>
          </div>
          <div class="file-setting">
            <print-file-item class="print-file-item"
                             :file="previewFile"
                             v-model="previewFile.raw.printSetting"
                             :price="point && point.price">
              <div slot="control">
                <div class="page-panel">第<span class="count">1</span>面</div>
                <div class="tip">每份6张纸</div>
                <div class="tip">1份共6张纸</div>
              </div>
            </print-file-item>
          </div>
          <div class="pagination">
            <div class="panel"> 1 / 6 </div>
          </div>
        </div>
      </div>
    </div>
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
    components: {printFileItem}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../style/_variables'
  @import '../style/_animate'
  .preview
    position: fixed
    display: flex
    left: 0
    top: 0
    width: 100%
    height: 100%
    justify-content: center
    align-items: center
    background-color: rgba(#666, .6)
    z-index: 2
    .center
      width: 90%
      height: 100%
      .page
        overflow-y: scroll
        text-align: center
        margin: 0 auto
        padding-left: 8px
        height: 100%
        scrollbar()
        .page-list
          margin: 0 auto
          margin-top: 126px
          img
            box-shadow: 0 0 10px 0 #666
            margin: 10px auto 0
            max-width: 98%
      .file
        position: fixed
        left: 0
        top: 10px
        width: 100%
        .close
          position: absolute
          left: 0
          top: 35px
          width: 100%
          .content
            width: 1120px
            text-align: right
            margin: 0 auto
            .close-btn
              border-radius: 30px
              height: 30px
              width: 30px
              line-height: 30px
              text-align: center
              font-size: 20px
              background-color: #fff
              cursor: pointer
              opacity: .9
              box-shadow: 0 0 12px 0 #999
        .print-file-item
          box-shadow: 0 0 8px 0 #999
          .page-panel
            padding-top: 4px
            color: #069
            .count
              font-size: 18px
          .tip
            padding-top: 7%
            font-size: 12px
            color: #999
        .pagination
          position: fixed
          width: 100%
          bottom: 20px
          text-align: center
          .panel
            display: inline-block
            padding: 6px
            border-radius: 4px
            font-size: 12px
            color: #fff
            background-color: rgba(#000,.4)

</style>
