import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
  focusAddress: [],
  focusPoint: null,
  fileList: []
};

const mutations = {
  updateFocusAddress (state, value) {
    state.focusPointAddress = value;
  },
  updateFocusPoint (state, value) {
    state.focusPoint = value;
  },
  updateFileList (state, fileList) {
    for (let file of fileList) {
      if (!('print' in file) && 'print' in file.raw) {
        file.print = file.raw.print;
        delete file.raw.print;
      }
    }
    state.fileList = fileList;
  },
  updateFileSetting (state, {uid, setting}) {
    let files = state.fileList;
    for (let [index, file] of files.entries()) {
      if (file.uid == uid) {
        file.print = setting;
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
