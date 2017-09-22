import Vue from 'vue'
import Vuex from 'vuex'
import print from './modules/print'

Vue.use(Vuex);

const state = {
  user: null,
};

const mutations = {
};

const store = new Vuex.Store({
  // strict: process.env.NODE_ENV !== 'production',
  state,
  mutations,
  modules: {
    print
  }
});

export default store
