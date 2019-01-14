import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    view: 'loading',
    tab: 'portals',
    snackbar: {
      active: false,
      color: undefined,
      timeout: 0,
      text: '',
    },
  },
  mutations: {
    info(state, payload) {
      // eslint-disable-next-line no-param-reassign
      state.snackbar.color = undefined;
      // eslint-disable-next-line no-param-reassign
      state.snackbar.timeout = payload.timeout || 5000;
      // eslint-disable-next-line no-param-reassign
      state.snackbar.text = payload.text;
      // eslint-disable-next-line no-param-reassign
      state.snackbar.active = true;
    },
    error(state, payload) {
      // eslint-disable-next-line no-param-reassign
      state.snackbar.color = 'error';
      // eslint-disable-next-line no-param-reassign
      state.snackbar.timeout = payload.timeout || 7500;
      // eslint-disable-next-line no-param-reassign
      state.snackbar.text = payload.text;
      // eslint-disable-next-line no-param-reassign
      state.snackbar.active = true;
    },
    setView(state, payload) {
      // eslint-disable-next-line no-param-reassign
      state.view = payload;
    },
    setTab(state, payload) {
      // eslint-disable-next-line no-param-reassign
      state.tab = payload;
    },
  },
  actions: {

  },
});
