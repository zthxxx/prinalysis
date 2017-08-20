<template>
  <div class="upload-box-out">
    <upload-drag-box @file="transmitFiles">
      <print-file-list :point="focusPoint"
                       :fileList="fileList"
                       :handleRemove="transmitRemove">
      </print-file-list>
      <transition name="float-fade">
        <div class="tip" v-if="!fileList.length">
          请从本地上传文件 或
          <router-link :to="{name: 'library'}">
            <span class="to-library">从校园文库添加文件</span>
          </router-link>
        </div>
      </transition>
      <el-upload action="https://jsonplaceholder.typicode.com/posts/"
                 class="upload" ref="uploader" multiple
                 :show-file-list="false"
                 :file-list="fileList"
                 :before-upload="onBeforeUpload"
                 :on-success="onSuccessUpload"
                 :on-remove="onRemoveFile"
                 :on-error="onErrorUpload">
        <div class="uploadBtn">
          <span class="upload_title" v-if="!fileList.length">添加文件</span>
          <span class="upload_title" v-else>继续添加文件</span>
          <br>
          <span class="upload_text">点击按钮或者把文件拖放到这里</span>
        </div>
        <div class="el-upload__tip" slot="tip">已支持的格式：doc, docx, pdf, ppt, pptx, jpg, png</div>
      </el-upload>
    </upload-drag-box>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import uploadDragBox from './UploadDragBox'
  import printFileList from './PrintFileList'
  import getFileMD5 from '@/assets/js/getFileMD5'
  import checkMD5 from '@/assets/js/checkMd5'
  import getPage from '@/assets/js/getPage'
  export default {
    name: 'upload-box',
    props: {
      focusPoint: {
        required: true,
        default: null
      }
    },
    data () {
      return {}
    },
    computed: {...mapState(['fileList'])},
    methods: {
      transmitFiles (files) {
        this.$refs.uploader.$refs['upload-inner'].uploadFiles(files);
      },
      transmitRemove (file) {
        this.$refs.uploader.handleRemove(file);
      },
      fileFormatCheck (rawFile) {
        let supports = ['doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'pdf', 'jpg', 'png'];
        rawFile.extension = rawFile.name.split('.').pop().toLowerCase();
        if (supports.findIndex((format) => format == rawFile.extension) < 0) {
          this.$notify.error({
            title: `暂不支持此文件格式: ${rawFile.extension}`,
            message: `当前仅支持 ${supports.join('，')} 等格式。`
          });
          throw 'stop-upload';
        }
        if (rawFile.name.match(/^~\$/)) {
          this.$notify.error({
            title: '该文件为 "影子文件"，无法打印',
            message: `文件 ${rawFile.name} 为"影子文件"，无法添加到打印列表。请添加相同目录下不以 "~$" 开头的同名文件，它才是本尊！`
          });
          throw 'stop-upload';
        }
      },
      fileExistCheck (rawFile) {
        let check = checkMD5(rawFile.md5, rawFile.name);
        if (check.result == 'EXISTED') {
          console.warn('exist', rawFile.name, rawFile.md5);
          rawFile.pageInfo = {pageCount: check.pageCount, direction: check.direction};
          rawFile.printSetting = this.defaultPrint(rawFile);
          this.$refs.uploader.handleStart(rawFile);
          throw 'stop-upload';
        }
      },
      defaultPrint (rawFile) {
        return {
          layout: 1,
          copies: 1,
          color: 'mono',
          duplex: 1,
          startPage: 1,
          endPage: rawFile.pageInfo.pageCount
        };
      },
      async onBeforeUpload (rawFile) {
        this.fileFormatCheck(rawFile);
        rawFile.md5 = await getFileMD5(rawFile);
        rawFile.origin = '本地上传';
        console.info(rawFile.md5);
        this.fileExistCheck(rawFile);
      },
      onSuccessUpload (response, file, fileList) {
        console.warn('success', file);
        console.warn('success', fileList);
        file.raw.pageInfo = getPage(file.raw.md5, file.name);
        this.$store.commit('updateFileList', fileList);
      },
      onErrorUpload (err) {
        console.error('err-upload', err);
        this.$notify.error({
          title: '上传出错',
          message: '请检查网络和文件类型'
        });
      },
      onRemoveFile (file, fileList) {
        console.warn('remove', file);
        console.warn('remove', fileList);
        this.$store.commit('updateFileList', fileList);
      }
    },
    components: {uploadDragBox, printFileList}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../style/_variables"
  @import "../style/_animate.styl"
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
    &:hover
      box-shadow: 0 0 6px 0 #999

</style>
