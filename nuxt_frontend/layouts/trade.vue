<template>
  <v-app class="user-layout">

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

  </v-app>
</template>

<style scoped>
@import "../assets/styles/login.css";
</style>

<script>
import Vue from 'vue'
import Vuetify from 'vuetify'

import Header from '../components/Header.vue'

Vue.use(Vuetify)

export default {  
  component: {
    Header
  },
  data: () => {
    return {
      showDialog: false,
      username: "",
      password: "",
    };
  },
  methods: {
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
      this.$router.push("/")
    }
  },
  mounted() {
    this.resizeLogo();
  },
};
</script>