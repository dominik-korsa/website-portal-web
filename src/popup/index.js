import '@mdi/font/css/materialdesignicons.css';
import Vue from 'vue';
import Vuetify from 'vuetify';
import AsyncComputed from 'vue-async-computed';
import App from './root.vue';
import store from './store';
import BackgroundConnector from './BackgroundConnector';

global.Vue = Vue;
global.store = store;
global.BackgroundConnector = BackgroundConnector;

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(AsyncComputed);

new Vue({
  store,
  iconfont: 'mdi',
  render: h => h(App),
}).$mount('#root');

async function init() {
  try {
    const loggedIn = await BackgroundConnector.isLoggedIn();
    if (loggedIn) {
      store.commit('setView', 'main');
      store.commit('setTab', 'portals');
      // store.commit("info", {text: `Logged in!`});
    } else {
      store.commit('setView', 'register');
    }
  } catch (error) {
    store.commit('error', { text: error.message });
  }
}

init();
