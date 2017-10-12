import * as types from '../mutation-types';

// initial state
export const state = {
  user: null,
  details: null
};

// mutations
export const mutations = {
  [types.SET_USER] (state, value) {
    state.user = value;
  },
  [types.SET_DETAILS] (state, value) {
    state.details = value;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
