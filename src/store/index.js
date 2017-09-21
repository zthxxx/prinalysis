import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import {presetPrint} from '@/utils/tools'

Vue.use(Vuex);

const state = {
  focusAddress: [],
  focusPoint: null,
  fileList: []
};

const mutations = {
  updateFocusAddress (state, value) {
    state.focusAddress = value;
  },
  updateFocusPoint (state, value) {
    state.focusPoint = value;
  },
  updateFileList (state, fileList) {
    for (let file of fileList) {
      if (!_.has(file, 'pageInfo') && _.has(file, ['raw', 'pageInfo'])) {
        Vue.set(file, 'pageInfo', file.raw.pageInfo);
        delete file.raw.pageInfo;
      }
      if (!_.has(file, 'print') && _.has(file, 'pageInfo')) {
        Vue.set(file, 'print', presetPrint(file.pageInfo, state.focusPoint));
      }
    }
    state.fileList = fileList;
  },
  updateFileSetting (state, {uid, setting}) {
    let files = state.fileList;
    for (let [index, file] of files.entries()) {
      if (file.uid == uid) {
        Vue.set(file, 'print', setting);
        Vue.set(state.fileList, index, file);
        break;
      }
    }
  }
};

const actions = {};

const store = new Vuex.Store({
  // strict: process.env.NODE_ENV !== 'production',
  state,
  actions,
  mutations,
});

export default store
