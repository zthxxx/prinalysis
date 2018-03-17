import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import print from './modules/print'
import share from './modules/share'

Vue.use(Vuex)

const state = {}

const mutations = {}

const store = new Vuex.Store({
  // strict: process.env.NODE_ENV !== 'production',
  state,
  mutations,
  modules: {
    user,
    print,
    share
  }
})

export default store
