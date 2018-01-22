<template>
  <div class="upload-box-out">
    <upload-drag-box @file="transmitFiles">
      <slot></slot>
      <transition name="float-fade">
        <header class="tip" v-if="!fileList.length">
          请从本地上传文件 或
          <router-link :to="{name: 'library'}">
            <span class="to-library">从校园文库添加文件</span>
          </router-link>
        </header>
      </transition>
      <el-upload class="upload" ref="uploader" multiple
                 :action="action"
                 :data="payload"
                 :show-file-list="false"
                 :file-list="fileList"
                 :on-change="onChange"
                 :before-upload="onBeforeUpload"
                 :on-progress="onProgress"
                 :on-remove="onRemoveFile"
                 :on-error="onErrorUpload">
        <div class="upload-btn">
          <span class="upload-title" v-if="!fileList.length">添加文件</span>
          <span class="upload-title" v-else>继续添加文件</span>
          <br>
          <span class="upload-text">点击按钮或者把文件拖放到这里</span>
        </div>
        <footer class="el-upload__tip" slot="tip">已支持的格式：{{supportFormat.join(',')}}</footer>
      </el-upload>
    </upload-drag-box>
  </div>
</template>

<script>
  import _ from 'lodash'
  import uploadDragBox from './UploadDragBox'
  import { getFileMD5 } from '@/utils/fileHelper'
  import { getPage, getFileURL } from '@/api'

  export default {
    name: 'upload-box',
    components: { uploadDragBox },
    props: {
      sizeKbLimit: {
        type: Number,
        default: 20 * 1024
      },
      fileList: {
        type: Array,
        required: true
      },
      updateFiles: {
        type: Function
      }
    },
    data () {
      return {
        action: '',
        payload: {},
        supportFormat: ['doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'pdf']
      }
    },
    methods: {
      transmitFiles (rawFiles) {
        this.$refs.uploader.$refs['upload-inner'].uploadFiles(rawFiles)
      },
      transmitRemove (file) {
        this.$refs.uploader.handleRemove(file)
      },
      async getUploadURL ({ md5, name }) {
        let { url } = await getFileURL({ md5, name })
        this.action = url
      },
      async setPageInfo (file) {
        if (file.status === 'success' && !_.has(file, 'pageInfo')) {
          let { pageCount, vertical } = await getPage({ md5: file.raw.md5, name: file.name })
          this.$set(file, 'pageInfo', { pageCount, vertical })
        }
      },
      fileSizeLimit (rawFile, sizeKb) {
        let size = rawFile.size
        if (size / 1024 > sizeKb) {
          this.$notify.error({
            title: '请不要上传太大的文件',
            message: `该文件 ${rawFile.name} 大小超过 ${sizeKb / 1024}MB 限制，无法上传`
          })
          throw new Error('stop-upload Size too large')
        }
      },
      fileFormatCheck (rawFile) {
        let supports = this.supportFormat
        rawFile.extension = rawFile.name.split('.').pop().toLowerCase()
        if (!rawFile.name.match(/\./) ||
          supports.findIndex((format) => format === rawFile.extension) < 0) {
          this.$notify.error({
            title: `暂不支持此文件格式: ${rawFile.extension}`,
            message: `当前仅支持 ${supports.join('，')} 等格式。`
          })
          throw new Error('stop-upload Format not support')
        }
        if (rawFile.name.match(/^~\$/)) {
          this.$notify.error({
            title: '该文件为 "影子文件"，无法打印',
            message: `文件 ${rawFile.name} 为"影子文件"，无法添加到打印列表。请添加相同目录下不以 "~$" 开头的同名文件，它才是本尊！`
          })
          throw new Error('stop-upload Office Temp')
        }
      },
      async fileExistCheck (rawFile) {
        let check = await getPage(rawFile)
        if (check.state === 'EXISTED') {
          let { pageCount, vertical } = check
          rawFile.pageInfo = { pageCount, vertical }
          this.$refs.uploader.handleStart(rawFile)
          throw new Error('stop-upload File existed')
        }
      },
      async onBeforeUpload (rawFile) {
        this.fileSizeLimit(rawFile, this.sizeKbLimit)
        this.fileFormatCheck(rawFile)
        rawFile.md5 = await getFileMD5(rawFile)
        rawFile.origin = '本地上传'
        await this.fileExistCheck(rawFile)
        await this.getUploadURL(rawFile)
      },
      async onChange (file, fileList) {
        await this.setPageInfo(file)
        if (!_.has(file, ['raw', 'pageInfo'])) {
          this.updateFiles(fileList)
        }
      },
      onProgress (event, file) {
        let { loaded, total, timeStamp } = event
        let last = _.get(file, 'loaded', { loaded, total, timeStamp })
        let speed = timeStamp > last.timeStamp ?
          ((loaded - last.loaded) / 1024) / ((timeStamp - last.timeStamp) / 1000) : 0
        let remain = ((total - loaded) / 1024) / (speed || 1)
        this.$set(file, 'loaded', { loaded, timeStamp })
        this.$set(file, 'speed', speed.toFixed(2))
        this.$set(file, 'remain', remain.toFixed(0))
      },
      onErrorUpload (err) {
        console.error('err-upload', err)
        this.$notify.error({
          title: '上传出错',
          message: '请检查网络和文件类型'
        })
      },
      onRemoveFile (file, fileList) {
        this.updateFiles(fileList)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./upload-box"
</style>
