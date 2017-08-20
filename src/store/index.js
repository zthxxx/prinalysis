import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
  focusPointAddress: [],
  focusPoint: null,
  fileList: []
};

const mutations = {
  updatePointAddress (state, value) {
    state.focusPointAddress = value;
  },
  updateFocusPoint (state, value) {
    state.focusPoint = value;
  },
  updateFileList (state, value) {
    state.fileList = value;
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
