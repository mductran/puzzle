<template>
  <div class="header">
    <v-toolbar dense class="fixed-bar" id="navbar">
      <v-btn class="logo-btn" plain>
        <v-img
          contain
          src="../assets/thuzzle-logo.png"
          :max-height="logoHeight"
          :max-width="logoWidth"
          @click="logoClick"
        ></v-img>
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text @click.stop="swapPage('Trade')"> Trade </v-btn>
        <v-btn text @click.stop="swapPage('YourStore')">
          Your Storefront
        </v-btn>
        <v-btn text @click.stop="swapPage('Puzzle')"> For sale </v-btn>
        <v-btn text @click.stop="revealLogin"> Sign in </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<style>
@import "../assets/styles/header.css";
</style>

<script>
import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/dist/vuetify.min.css";

import EventBus from "./EventBus";

Vue.use(Vuetify);

export default {
  name: "Header",
  data() {
    return {
      logoWidth: 0,
      logoHeight: 0,
    };
  },
  methods: {
    resizeLogo() {
      this.logoHeight = document.getElementById("navbar").offsetHeight;
      this.logoWidth = document.getElementById("navbar").offsetWidth * 0.1;
    },
    logoClick() {
      window.location.href = "http://localhost:8080/";
    },
    revealLogin() {
      console.log("emitting");
      EventBus.$emit("revealLoginOverlay");
    },
    swapPage(page) {
      EventBus.$emit("swapPage", page);
    },
  },
  mounted() {
    this.resizeLogo();
  },
};
</script>

