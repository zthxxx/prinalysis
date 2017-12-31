import router from '@/router'
import * as types from '../mutation-types'
import { routeIdentify } from '@/utils/tools'

const USER_BASE = 'USER_BASE'

// initial state
export const state = {
  user: JSON.parse(window.localStorage.getItem(USER_BASE)),
  details: null
}

// mutations
export const mutations = {
  [types.GET_USER_CACHE] (state) {
    let userBase = window.localStorage.getItem(USER_BASE)
    state.user = JSON.parse(userBase)
  },
  [types.SET_USER] (state, user) {
    window.localStorage.setItem(USER_BASE, JSON.stringify(user))
    let matches = router.match(window.location.pathname).matched
    state.user = user
    routeIdentify(matches, user)
      .catch(() => router.push({ name: 'index' }))
  },
  [types.SET_DETAILS] (state, value) {
    state.details = value
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
