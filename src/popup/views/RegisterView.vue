<template>
  <v-container fill-height>
    <v-layout align-space-around justify-center column fill-height>
      <v-form @submit="submit" v-model="valid">
        <v-layout align-end justify-center row>
          <v-text-field label="Portal Name" outline v-model="name" counter minlength="3" maxlength="32" :rules="rules" ref="name" hint="Enter a friendly name for your device" persistent-hint :readonly="working"></v-text-field>
        </v-layout>
        <v-layout justify-end>
          <v-btn outline color="indigo" :disabled="!valid" type="submit" :loading="working">Register</v-btn>
        </v-layout>
      </v-form>
    </v-layout>
  </v-container>
</template>

<script>
import store from '../store';
import BackgroundConnector from '../BackgroundConnector';

export default {
  data: () => ({
    name: '',
    valid: false,
    working: false,
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
  }),
  methods: {
    submit(e) {
      e.preventDefault();
      if (!this.$data.working) {
        this.$data.working = true;
        BackgroundConnector.register(this.$data.name)
          .then(() => {
            store.commit('info', { text: 'Registered' });
            store.commit('setView', 'main');
            this.$data.working = false;
          })
          .catch((error) => {
            store.commit('error', { text: error.message });
            this.$data.working = false;
          });
      }
    },
    // register () {
    //   store.commit("setState", "loading");
    // }
  },
  // computed: {
  //   isValid () {
  //     try { return this.$refs.name.valid; }
  //     catch (err) { console.warn(err); return false; }
  //   }
  // }
};
</script>
