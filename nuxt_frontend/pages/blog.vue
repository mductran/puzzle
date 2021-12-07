<template>
  <v-container class="page-container">
    <v-card elevation="0">
      <v-text-field
        placeholder=" Share your puzzle"
        v-model="postContent"
        append-outer-icon="mdi-send"
        @click:append-outer="sharePost"
      />
    </v-card>
    <v-responsive class="justify-center">
      <div v-for="post in this.myPosts" v-bind:key="post.id">
        <Post v-bind:postContent="post" />
      </div>
    </v-responsive>
  </v-container>
</template>

<style scoped>
@import "../assets/styles/posts.css";
</style>

<script>
import { mapGetters, mapState } from "vuex";

import Vue from "vue";
import Vuetify from "vuetify";
import Post from "../components/Post.vue";

Vue.use(Vuetify);

export default {
  layout(context) {
    return "index";
  },
  data: () => {
    return {
      layoutName: "",
      postContent: "",
    };
  },
  computed: {
    ...mapGetters({
      myPosts: "blogs/getPosts",
      myCurrentUser: "users/getCurrentUser",
      myTotalPages: "blogs/getTotalPages",
      myCurrentPost: "blogs/getCurrentPost",
      myCurrentPage: "blogs/getCurrentPage",
    }),
  },
  components: {
    Post,
  },
  methods: {
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    },
    sharePost() {
      const token = this.getCookie("access_token");
      const payload = {
        body: {
          content: this.postContent,
          author_id: this.myCurrentUser.id,
        },
        token: token,
      };
      this.$store.dispatch("blogs/sharePost", payload, token);
    },
  },
  created() {
    this.$store.dispatch("blogs/getPosts");
  },
};
</script>
