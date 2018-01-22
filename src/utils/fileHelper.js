const SparkMD5 = require('spark-md5')
import { getPage } from '@/api'
import { Notification } from 'element-ui'
import * as types from '@/store/mutation-types'
import store from '@/store'

export const getFileMD5 = function (file) {
  return new Promise(function (resolve, reject) {
    // Read in chunks of 2MB
    let chunkSize = 2 * 1024 * 1024
    let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
    let chunks = Math.ceil(file.size / chunkSize)
    let currentChunk = 0
    let spark = new SparkMD5.ArrayBuffer()
    let fileReader = new FileReader()

    fileReader.onload = function (e) {
      spark.append(e.target.result)
      currentChunk++
      if (currentChunk < chunks) {
        loadNext()
      } else {
        let md5Value = spark.end().toUpperCase()
        resolve(md5Value)
      }
    }

    fileReader.onerror = function () {
      let errorMsg = 'fileReader went wrong.'
      console.error(errorMsg)
      reject(errorMsg)
    }

    function loadNext () {
      let start = currentChunk * chunkSize
      let end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize

      fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
    }

    loadNext()
  })
}

export const creatFileFormLibrary = async ({ name, id, format, index = null }) => {
  let file = {
    name,
    raw: {
      md5: id,
      extension: format,
      origin: '校园文库'
    },
    pageInfo: await getPage({ name, md5: id }),
    uid: Date.now() + id + index || store.state.print.fileList,
    status: 'success'
  }
  return file
}

export const pushFileFormLibrary = async (fileInfo, notify = true) => {
  let file = await creatFileFormLibrary(fileInfo)
  store.commit('print/' + types.ADD_FILE, file)
  notify && Notification.success({
    message: '已加入到打印队列'
  })
}
