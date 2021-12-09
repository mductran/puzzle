<template>
  <v-app class="user-layout">
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

        <NuxtLink :to="{path: 'trade'}">
          <v-btn text> Trade </v-btn>
        </NuxtLink>

        <NuxtLink :to="{name: 'blog', query: {page: 1}}">
          <v-btn text> Blog </v-btn>
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

    <Nuxt />

    <v-overlay v-if="showDialog">
      <v-card
        :light="true"
        elevation="0"
        outlined
        min-width="500px"
        v-click-outside="showLoginDialog"
        class="login-card"
      >
        <v-card-title>
          <v-spacer />
          <v-icon @click.stop="showLoginDialog">
            mdi-close-circle-outline
          </v-icon>
        </v-card-title>
        <v-text-field
          id="username-input"
          label="username"
          type="text"
          v-model="username"
          clearable
          class="input-field"
        />
        <v-text-field
          id="password-input"
          label="password"
          type="password"
          v-model="password"
          autocomplete="off"
          clearable
          class="input-field"
        />

        <p style="margin: auto; padding: 15px">Forgot your password?</p>

        <NuxtLink to="/register">
          <v-btn id="register-btn" label="register" text class="input-btn">
            Register
          </v-btn>
        </NuxtLink>
        <v-btn
          id="login-btn"
          label="login"
          text
          @click.prevent="authenticate"
          class="input-btn"
        >
          Login
        </v-btn>
      </v-card>
    </v-overlay>

    <div class="footer"></div>
  </v-app>
</template>

<style scoped>
@import "../assets/styles/header.css";
@import "../assets/styles/login.css";
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
      showDialog: false,
      query: "",
      username: "",
      password: "",
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
      this.showDialog = !this.showDialog;
    },
    authenticate() {
      this.$store.dispatch(
        "users/login",
        {
          username: this.username,
          password: this.password,
        },
        { root: true }
      )
      this.showDialog = false
    },
    logout() {
      this.$store.dispatch("users/logout")
      // window.location.assign("http://localhost:3000/introduction")
      this.$route.push("index")
    }
  },
  mounted() {
    this.resizeLogo();
  },
};
</script>