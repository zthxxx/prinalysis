import Vue from 'vue'
import _ from 'lodash'
import { presetPrint } from '@/utils/tools'
import * as types from '../mutation-types'

// initial state
export const state = {
  focusAddress: [],
  focusPoint: null,
  fileList: []
}

// mutations
export const mutations = {
  [types.SELECT_ADDRESS] (state, value) {
    state.focusAddress = value
  },
  [types.SELECT_POINT] (state, value) {
    state.focusPoint = value
  },
  [types.ADD_FILE] (state, file) {
    state.fileList.push(file)
  },
  [types.UPDATE_FILES] (state, fileList) {
    for (let file of fileList) {
      if (!_.has(file, 'pageInfo') && _.has(file, ['raw', 'pageInfo'])) {
        Vue.set(file, 'pageInfo', file.raw.pageInfo)
        delete file.raw.pageInfo
      }
      if (!_.has(file, 'print') && _.has(file, 'pageInfo')) {
        Vue.set(file, 'print', presetPrint(file.pageInfo, state.focusPoint))
      }
    }
    state.fileList = fileList
  },
  [types.SET_PRINTING] (state, { uid, setting }) {
    let files = state.fileList
    for (let [index, file] of files.entries()) {
      if (file.uid === uid) {
        Vue.set(file, 'print', setting)
        Vue.set(state.fileList, index, file)
        break
      }
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
