<template>
  <div class="pair-tab">
    <v-layout column fill-height align-center justify-center class="pair">
      <v-flex class="own-pairing-code" shrink>
        <h1 class="code-wrapper">
          Your code:
            <v-progress-circular indeterminate v-if="ownPairingCode == null"></v-progress-circular>
            <span class="code" v-else>{{ownPairingCode.toString().substring(0,3)}} {{ownPairingCode.toString().substring(3,6)}}</span>
        </h1>
      </v-flex>
      <v-divider class="divider" inset></v-divider>
      <v-flex class="enter-pairing-code" shrink>
        <form @submit="pairSubmit">
          <v-text-field outline mask="### ###" label="Code" hide-details v-model="enteredPairingCode" :readonly="working"></v-text-field>
          <v-btn color="primary" flat block :disabled="!enteredPairingCodeValid" type="submit" :loading="working">Pair</v-btn>
        </form>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import BackgroundConnector from '../../BackgroundConnector';
import store from '../../store';

export default {
  data() {
    return {
      portalObject: BackgroundConnector.portalObject,
      enteredPairingCodeInput: '',
      working: false,
    };
  },
  asyncComputed: {

  },
  computed: {
    ownPairingCode() {
      if (this.$data.portalObject.pairingCode == null) {
        BackgroundConnector.updatePairingCode()
          .catch((error) => {
            store.commit('error', { text: error.message });
          });
      }
      return this.$data.portalObject.pairingCode;
    },
    enteredPairingCode: {
      get() {
        return parseInt(this.$data.enteredPairingCodeInput, 10) || undefined;
      },
      set(value) {
        this.$data.enteredPairingCodeInput = value.toString();
      },
    },
    enteredPairingCodeValid: {
      get() {
        const { enteredPairingCode } = this;
        return (enteredPairingCode >= 100000 && enteredPairingCode < 1000000);
      },
    },
  },
  watch: {

  },
  methods: {
    async pairSubmit(e) {
      e.preventDefault();
      if (!this.$data.working) {
        this.$data.working = true;
        BackgroundConnector.pair(this.enteredPairingCode)
          .then(() => {
            this.$data.working = false;
            store.commit('info', { text: 'Paired' });
          })
          .catch((error) => {
            store.commit('error', { text: error.message });
            this.$data.working = false;
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .pair-tab {
    height: 100%;
  }

  .pair {
    height: 100%;
  }

  .own-pairing-code {
    text-align: center;
    height: 48px;
    box-sizing: content-box;
    .code-wrapper {
      height: 48px;
      font-size: 24px;
      line-height: 48px;
      font-weight: 400;
      .code {
        // font-family: 'Roboto Mono', monospace;
        font-weight: 600;
      }
    }
  }

  .divider {
    width: calc(100% - 72px);
    margin: 8px 0;
    box-sizing: border-box;
  }

  .enter-pairing-code {
    text-align: right;
    margin-top: 16px;
  }
</style>
