<template>
  <div class="settings-tab">
    <v-list two-line subheader>
        <!-- <v-subheader>This portal</v-subheader> -->

        <v-list-tile avatar @click="openRenameDialog">
          <v-list-tile-content>
            <v-list-tile-title>Portal name</v-list-tile-title>
            <v-list-tile-sub-title>{{name}}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>

        <!-- <v-list-tile disabled>
          <v-list-tile-action>
            <v-checkbox value="false" disabled></v-checkbox>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Background service</v-list-tile-title>
            <v-list-tile-sub-title>Stay active when browser closed (Not yet implemented)</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile> -->
      </v-list>

      <!-- <v-divider></v-divider>

      <v-list
        subheader
        two-line
      >
        <v-subheader>Hangout notifications</v-subheader>

        <v-list-tile @click="">
          <v-list-tile-action>
            <v-checkbox v-model="notifications"></v-checkbox>
          </v-list-tile-action>

          <v-list-tile-content @click="notifications = !notifications">
            <v-list-tile-title>Notifications</v-list-tile-title>
            <v-list-tile-sub-title>Allow notifications</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="">
          <v-list-tile-action>
            <v-checkbox v-model="sound"></v-checkbox>
          </v-list-tile-action>

          <v-list-tile-content @click="sound = !sound">
            <v-list-tile-title>Sound</v-list-tile-title>
            <v-list-tile-sub-title>Hangouts message</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="">
          <v-list-tile-action>
            <v-checkbox v-model="video"></v-checkbox>
          </v-list-tile-action>

          <v-list-tile-content @click="video = !video">
            <v-list-tile-title>Video sounds</v-list-tile-title>
            <v-list-tile-sub-title>Hangouts video call</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="">
          <v-list-tile-action>
            <v-checkbox v-model="invites"></v-checkbox>
          </v-list-tile-action>

          <v-list-tile-content @click="invites = !invites">
            <v-list-tile-title>Invites</v-list-tile-title>
            <v-list-tile-sub-title>Notify when receiving invites</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list> -->
    <v-dialog v-model="nameDialog.active" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Rename portal</span>
        </v-card-title>
        <v-form @submit="renameSubmit" v-model="nameDialog.valid">
          <v-card-text>
            <v-text-field label="Portal Name" outline v-model="nameDialog.input" counter minlength="3" maxlength="32" :rules="nameDialog.rules" ref="name" persistent-hint></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="nameDialog.active = false" flat>Cancel</v-btn>
            <v-btn color="primary" outline type="submit" :disabled="name == nameDialog.input || !nameDialog.valid">Save</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import BackgroundConnector from '../../BackgroundConnector';
import store from '../../store';

export default {
  data() {
    return {
      portalObject: BackgroundConnector.portalObject,
      nameDialog: {
        active: false,
        input: '',
        valid: false,
        rules: [
          value => !!value || 'Required',
          // required: "Required",
          (value) => {
            if (value.length > 32) {
              return 'The name should not exceed 32 characters';
            } if (value.length < 3) {
              return 'The name should have at least 3 characters';
            }
            return true;
          },
        ],
      },
    };
  },
  asyncComputed: {

  },
  computed: {
    name() {
      if (this.$data.portalObject.name == null) {
        BackgroundConnector.updateName()
          .catch((error) => {
            store.commit('error', { text: error.message });
          });
      }
      return this.$data.portalObject.name;
    },
  },
  watch: {

  },
  methods: {
    openRenameDialog() {
      if (this.name) {
        this.$data.nameDialog.input = this.name;
        this.$data.nameDialog.active = true;
      }
    },
    async renameSubmit(e) {
      e.preventDefault();
      this.$data.nameDialog.active = false;
      await BackgroundConnector.setOwnName(this.$data.nameDialog.input)
        .catch((error) => {
          store.commit('error', { text: error.message });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
  .settings-tab {
    height: 100%;
  }
</style>
