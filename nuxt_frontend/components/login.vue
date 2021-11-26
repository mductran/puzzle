<template>
  <div id="main">
    <v-card elevation="0" outlined min-width="500px" class="login-card">
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
        clearable
        class="input-field"
      />

      <p style="margin: auto; padding: 15px;">Forgot your password?</p>

      <v-btn id="register-btn" label="register" text @click.prevent="register" class="input-btn">
        Register
      </v-btn>
      <v-btn id="login-btn" label="login" text @click.prevent="authenticate" class="input-btn">
        Login
      </v-btn>
    </v-card>
  </div>
</template>

<style scoped>
@import "../assets/styles/login.css";
</style>

<script>
import Vue from "vue"
import Vuetify from "vuetify"

Vue.use(Vuetify);

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  computed: {
    user() {
      return this.$store.state.user.currentUser;
    },
  },
  methods: {
    authenticate() {
      console.log("username", this.username);
      console.log("password", this.password);
      this.$store.dispatch("users/login", {
        "username": this.username,
        "password": this.password,
      }, {root: true})
    },
  },
};
</script>
