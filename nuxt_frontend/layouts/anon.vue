<template>
  <v-app class="user-layout">
    <header>
      <v-toolbar elevation="0" dense class="fixed-bar" id="navbar">
        <v-spacer />
        <NuxtLink :to="myLogin ? '/' : '/introduction'">
          <v-img
            contain
            :src="logoSource"
            :max-width="logoWidth"
            :max-height="logoHeight"
          />
        </NuxtLink>
        <v-spacer />
      </v-toolbar>
    </header>

    <Nuxt/>

    <div class="footer"></div>
  </v-app>
</template>

<style scoped>
@import "../assets/styles/header.css";
</style>

<script>
import Vue from 'vue'
import Vuetify from 'vuetify'
import { mapGetters } from'vuex'

Vue.use(Vuetify)

export default {
  data: () => {
    return {
      logoSource: require("../assets/thuzzle-logo.png"),
      logoHeight: 0,
      logoWidth: 0,
    };
  },
  computed: {
    ...mapGetters({
      myLogin: 'users/getLogin',
      myCurrentUser: 'users/getCurrentUser',
    })
  },
  methods: {
    resizeLogo() {
      this.logoHeight = document.getElementById("navbar").offsetHeight;
      this.logoWidth = document.getElementById("navbar").offsetWidth * 0.15;
    },
  },
  mounted() {
    this.resizeLogo();
  },
};
</script>