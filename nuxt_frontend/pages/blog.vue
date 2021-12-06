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
      myTotalPages: "blogs/getTotalPages",
      myCurrentPost: "blogs/getCurrentPost",
      myCurrentPage: "blogs/getCurrentPage",
    }),
    // ...mapState({
    //   // myPosts: "blogs/posts",
    //   myPosts: state => state.blogs.posts // https://github.com/nuxt/nuxt.js/issues/3709 why??
    // })
  },
  components: {
    Post,
  },
  methods: {
    sharePost() {
      const payload = {
        content: this.postContent,
      };
    },
  },
  created() {
    this.$store.dispatch("blogs/getPosts");
  },
};
</script>
