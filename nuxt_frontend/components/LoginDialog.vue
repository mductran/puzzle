<template>
  <v-card
    :light="true"
    elevation="0"
    outlined
    min-width="500px"
    v-click-outside="toggleOverlay"
    class="login-card"
  >
    <v-card-title>
      Login
      <v-spacer />
      <v-icon @click.stop="toggleOverlay"> mdi-close-circle-outline </v-icon>
    </v-card-title>
    <v-text-field
      id="username-input"
      label="username"
      type="text"
      v-model="username"
      class="input-field"
    />
    <v-text-field
      id="password-input"
      label="password"
      type="visible ? 'text' : 'password'"
      v-model="password"
      autocomplete="off"
      append-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
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
</template>

<style scoped>
@import "../assets/styles/login.css";
</style>

<script>
import { mapGetters } from "vuex";

export default {
  name: "LoginDialog",
  data: () => {
    return {
      visible: false,
      username: "",
      password: "",
    };
  },
  computed: {
    ...mapGetters({
      myOverlay: "header/getOverlay",
    })
  },
  methods: {
    toggleOverlay() {
      this.$store.dispatch("header/toggleOverlay", !this.myOverlay)
    },
    authenticate() {
      this.$store.dispatch(
        "users/login",
        {
          username: this.username,
          password: this.password,
        },
        { root: true }
      );
      this.$store.dispatch("header/toggleOverlay", false);
    },
  },
};
</script>