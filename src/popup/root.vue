<template>
  <v-app>
    <loading-view v-if="view == 'loading'"/>
    <register-view v-if="view == 'register'"/>
    <main-view v-if="view == 'main'"/>
    <v-snackbar v-model="snackbar.active" :color="snackbar.color" :timeout="snackbar.timeout">{{ snackbar.text }}</v-snackbar>
  </v-app>
</template>

<script>
import LoadingView from './views/LoadingView.vue';
import RegisterView from './views/RegisterView.vue';
import MainView from './views/MainView.vue';
import store from './store';

export default {
  name: 'App',
  components: {
    LoadingView,
    RegisterView,
    MainView,
  },
  data() {
    return {};
  },
  computed: {
    view() {
      return store.state.view;
    },
    snackbar() {
      return store.state.snackbar;
    },
  },
  methods: {

  },
};
</script>

<style lang="scss">
  @import url('https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css');

  body {
    min-width: 300px;
    min-height: 450px;
  }

  html {
    overflow-y: auto;
  }

  .v-text-field--outline {
    .v-input__slot {
      border-width: 1px !important;
    }
  }
</style>
