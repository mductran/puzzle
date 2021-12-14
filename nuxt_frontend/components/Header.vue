<template>
  <header>
    <v-toolbar elevation="0" dense class="fixed-bar" id="navbar">
      <NuxtLink :to="myLogin ? '/introduction' : '/'">
        <v-img
          contain
          :src="logoSource"
          :max-width="logoWidth"
          :max-height="logoHeight"
        />
      </NuxtLink>

      <v-spacer />

      <div class="search-bar" :max-height="logoHeight">
        <v-text-field
          v-model="query"
          append-outer-icon="mdi-magnify"
          prepend-icon="mdi-filter-variant"
          @click:append-outer="search"
          class="searchbar-element"
        />
      </div>

      <v-spacer />

      <NuxtLink :to="{ path: 'trade', query: {page: 1} }">
        <v-btn text> Trade </v-btn>
      </NuxtLink>

      <NuxtLink :to="{ path: 'blog', query: { page: 1 } }">
        <v-btn text> Blog </v-btn>
      </NuxtLink>

      <NuxtLink :to="{ path: 'discussion', query: { page: 1 } }">
        <v-btn text> Discussion </v-btn>
      </NuxtLink>

      <v-menu text v-if="myLogin" offset-y bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn text v-bind="attrs" v-on="on">
            {{ myCurrentUser.username }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item text>
            <v-list-item-title>Your Profile</v-list-item-title>
          </v-list-item>
          <v-list-item text @click="logout">
            <v-list-item-title>Log Out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn text v-else @click.stop="showLoginDialog"> Sign In </v-btn>
    </v-toolbar>

    <v-overlay v-if="myOverlay">
      <LoginDialog />
    </v-overlay>
  </header>
</template>

<style scoped>
@import "../assets/styles/header.css";
</style>

<script>
import { mapGetters } from "vuex";

import LoginDialog from "./LoginDialog.vue";

export default {
  name: "Header",
  component: {
    LoginDialog,
  },
  data: () => {
    return {
      logoSource: require("../assets/thuzzle-logo.png"),
      logoHeight: 0,
      logoWidth: 0,
      query: "",
    };
  },
  computed: {
    ...mapGetters({
      myLogin: "users/getLogin",
      myCurrentUser: "users/getCurrentUser",
      myOverlay: "header/getOverlay",
    }),
  },
  methods: {
    resizeLogo() {
      this.logoHeight = document.getElementById("navbar").offsetHeight;
      this.logoWidth = document.getElementById("navbar").offsetWidth * 0.15;
    },
    constructParams() {
      return {
        content: this.query,
        author__user__username: "",
      };
    },
    search() {
      const params = this.constructParams();
      console.log("searching", params);
    },
    showLoginDialog() {
      this.$store.dispatch("header/toggleOverlay", !this.myOverlay);
    },
    logout() {
      this.$store.dispatch("users/logout");
      // window.location.assign("http://localhost:3000/introduction")
      this.$router.push("/");
    },
  },
  mounted() {
    this.resizeLogo();
  },
};
</script>