<template>
  <div class="main-view">
    <v-layout column class="layout" fill-height>
      <v-flex fill-height class="tab">
        <transition name="tab-fade" mode="out-in">
          <portals-tab v-if="tab == 'portals'"></portals-tab>
          <pair-tab v-if="tab == 'pair'"></pair-tab>
          <settings-tab v-if="tab == 'settings'"></settings-tab>
        </transition>
      </v-flex>
      <v-flex>
        <v-bottom-nav :value="true" color="white" :active.sync="tab" mandatory>
          <v-btn color="primary" flat value="portals">
            <span>Portals</span>
            <v-icon>phonelink</v-icon>
          </v-btn>

          <v-btn color="primary" flat value="pair">
            <span>Pair</span>
            <v-icon>add</v-icon>
          </v-btn>

          <v-btn color="primary" flat value="settings">
            <span>Settings</span>
            <v-icon>settings</v-icon>
          </v-btn>
        </v-bottom-nav>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import PortalsTab from './tabs/PortalsTab.vue';
  import PairTab from './tabs/PairTab.vue';
  import SettingsTab from './tabs/SettingsTab.vue';

  export default {
    data: () => ({
    }),
    components: {
      PortalsTab,
      PairTab,
      SettingsTab,
    },
    computed: {
      tab: {
        get() {
          return this.$store.state.tab;
        },
        set(value) {
          this.$store.commit('setTab', value);
        },
      },
    },
  };
</script>

<style lang="scss">
  .tab-fade-enter-active {
    transition: opacity 250ms ease-in;
  }
  .tab-fade-leave-active {
    transition: opacity 100ms ease-in;
  }
  .tab-fade-enter, .tab-fade-leave-to
  /* .component-fade-leave-active below version 2.1.8 */ {
    opacity: 0 !important;
  }

  .layout {
    height: 100vh;
  }
  .tab {
    height: 100%;
    overflow: auto;
  }
  .main-view {
    height: 100vh;
    overflow: hidden;
  }
</style>
