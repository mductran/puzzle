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

      <NuxtLink :to="{ path: 'trade' }">
        <v-btn text> Trade </v-btn>
      </NuxtLink>

      <NuxtLink :to="{ name: 'blog', query: { page: 1 } }">
        <v-btn text> Blog </v-btn>
      </NuxtLink>

      <NuxtLink :to="{ name: 'discussion', query: { page: 1 } }">
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
  </header>
</template>

<style scoped>
@import "../assets/styles/header.css";
</style>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Header",
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
  },
};
</script>