import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    query: '',
  },
  mutations: {
    setQuery(state, payload) {
      state.query = payload;
    },
  },
  actions: {},
  modules: {},
});
