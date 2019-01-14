<template>
  <div class="portals-tab">
    <v-layout align-center justify-center column v-if="portals == null" class="portals">
      <v-progress-circular indeterminate color="primary" size="48"></v-progress-circular>
    </v-layout>
    <v-list subheader v-else-if="portals.length > 0" class="portals">
      <v-subheader v-if="activePortals.length > 0">Online portals</v-subheader>
      <v-list-tile v-for="portal in activePortals" :key="portal.id" @click="showDialog(portal)" avatar>
        <v-list-tile-avatar>
          <v-icon v-if="portal.platform == 'chrome'">mdi-google-chrome</v-icon>
          <v-icon v-else-if="portal.platform == 'android'">android</v-icon>
          <v-icon v-else-if="portal.platform == 'ios'">mdi-apple-ios</v-icon>
          <v-icon v-else-if="portal.platform == 'firefox'">mdi-firefox</v-icon>
          <v-icon v-else-if="portal.platform == 'opera'">mdi-opera</v-icon>
          <v-icon v-else-if="portal.platform == 'safari'">mdi-apple-safari</v-icon>
          <v-icon v-else>highlight_off</v-icon>
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>{{portal.name}}</v-list-tile-title>
        </v-list-tile-content>

        <!-- <v-list-tile-action> -->
          <!-- <v-btn icon ripple>
            <v-icon>more_vert</v-icon>
          </v-btn> -->
        <!-- </v-list-tile-action> -->
      </v-list-tile>
      
      <v-divider v-if="activePortals.length > 0 && inactivePortals.length > 0"></v-divider>

      <v-subheader v-if="inactivePortals.length > 0">Offline portals</v-subheader>
      <v-list-tile color="#888" v-for="portal in inactivePortals" :key="portal.id">
        <v-list-tile-content>
          <v-list-tile-title>{{portal.name}}</v-list-tile-title>
        </v-list-tile-content>

        <!-- <v-list-tile-action>
          <v-btn icon ripple>
            <v-icon color="">more_vert</v-icon>
          </v-btn>
        </v-list-tile-action> -->
      </v-list-tile>
    </v-list>
    <v-layout align-center justify-center column v-else class="portals">
      <div class="no-portals">
        <h5 class="headline">No paired portals</h5>
        <v-btn outline color="indigo" block @click="pairNow">Pair now</v-btn>
      </div>
    </v-layout>
    <v-bottom-sheet v-model="sheet.active">
      <div class="bottom-sheet-layout">
        <v-btn color="primary" block outline @click="sendThis">Send current tab</v-btn>
        <v-divider></v-divider>
        <form @submit="sendCustomSubmit">
          <v-text-field outline label="URL" hide-details v-model="sheet.customURL"></v-text-field>
          <!-- <v-textarea v-model="sheet.customURL" auto-grow outline label="URL" rows="1"></v-textarea> -->
          <v-btn color="primary" block flat :disabled="!sheet.customURL" type="submit">Send custom URL</v-btn>
        </form>
      </div>
    </v-bottom-sheet>
  </div>
</template>

<script>
import BackgroundConnector from '../../BackgroundConnector';
import store from '../../store';

export default {
  data() {
    return {
      sheet: {
        active: false,
        id: '',
        customURL: '',
      },
      portalsSaved: null,
    };
  },
  asyncComputed: {
    portals: {
      get() {
        return BackgroundConnector.getPortals()
          .catch((error) => {
            store.commit('error', { text: error.message });
          });
      },
      default: null,
    },
  },
  computed: {
    activePortals() {
      return this.portals.filter(value => value.active === true);
    },
    inactivePortals() {
      return this.portals.filter(value => value.active === false);
    },
  },
  methods: {
    showDialog(portal) {
      this.$data.sheet.id = portal.id;
      this.$data.sheet.customURL = '';
      this.$data.sheet.active = true;
    },
    sendThis() {
      this.$data.sheet.active = false;
      this.send();
    },
    send(url) {
      BackgroundConnector.sendWebsite(this.$data.sheet.id, url || undefined)
        .catch((error) => {
          this.$store.commit('error', { text: error.message });
        });
    },
    sendCustomSubmit(e) {
      e.preventDefault();
      this.$data.sheet.active = false;
      this.send(this.$data.sheet.customURL);
    },
    pairNow() {
      this.$store.commit('setTab', 'pair');
    },
  },
};
</script>

<style lang="scss" scoped>
  .portals-tab {
    height: 100%;
  }

  .portals {
    height: 100%;
    overflow: auto;
  }

  .no-portals {
    text-align: center;
  }
  
  .bottom-sheet-layout {
    background-color: #fff;
    padding: 6px 8px 1px;
    text-align: center;

    .v-divider {
      margin-top: 12px;
      margin-bottom: 12px;
      border-color: rgba(0,0,0,0.24);
    }
  }
</style>
