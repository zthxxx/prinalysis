import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import print from './modules/print'

Vue.use(Vuex);

const state = {
};

const mutations = {
};

const store = new Vuex.Store({
  // strict: process.env.NODE_ENV !== 'production',
  state,
  mutations,
  modules: {
    user,
    print
  }
});

export default store
