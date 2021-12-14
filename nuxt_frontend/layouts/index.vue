<template>
  <v-app class="user-layout">
    
    <Header />

    <Nuxt />

    <v-overlay v-if="showDialog">
      <LoginDialog />
    </v-overlay>
  </v-app>
</template>

<style scoped>
@import "../assets/styles/login.css";
</style>

<script>
import Vue from "vue";
import Vuetify from "vuetify";

import Header from "../components/Header.vue";
import LoginDialog from "../components/LoginDialog.vue";

Vue.use(Vuetify);

export default {
  component: {
    Header,
    LoginDialog,
  },
  data: () => {
    return {
      showDialog: false,
    };
  },
  methods: {

  },
  mounted() {
  },
};
</script>