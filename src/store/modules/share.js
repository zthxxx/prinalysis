import Vue from 'vue'
import _ from 'lodash'
import * as types from '../mutation-types'

// initial state
export const state = {
  fileList: []
}

// mutations
export const mutations = {
  [types.ADD_FILE] (state, file) {
    state.fileList.push(file)
  },
  [types.UPDATE_FILES] (state, fileList) {
    for (let file of fileList) {
      if (!_.has(file, 'pageInfo') && _.has(file, ['raw', 'pageInfo'])) {
        Vue.set(file, 'pageInfo', file.raw.pageInfo)
        delete file.raw.pageInfo
      }
      if (!_.has(file, 'share')) {
        Vue.set(file, 'share', {
          rename: file.name,
          institute: '',
          major: '',
          semester: '',
          subject: '',
        })
      }
    }
    state.fileList = fileList
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
