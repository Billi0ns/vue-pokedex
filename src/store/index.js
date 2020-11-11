import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentPokemon: {},
  },
  mutations: {
    setCurrentPokemon(state, payload) {
      state.currentPokemon = payload;
    },
  },
  actions: {},
  modules: {},
});
