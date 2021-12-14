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

    <v-pagination
      circle
      v-model="myCurrentPage"
      :length="myTotalPages"
      :total_visible="7"
      color="#42a5f5"
      @input="goToPage"
    />
  </v-container>
</template>

<style scoped>
@import "../assets/styles/posts.css";
</style>

<script>
import { mapGetters } from "vuex";

import Vue from "vue";
import Vuetify from "vuetify";
import Post from "../components/Post.vue";

Vue.use(Vuetify);

export default {
  layout(context) {
    return "trade";
  },
  data: () => {
    return {
      postContent: "",
      myCurrentPage: 1,
    };
  },
  computed: {
    ...mapGetters({
      myLogin: "users/getLogin",
      myCurrentUser: "users/getCurrentUser",
      myPosts: "blogs/getPosts",
      myTotalPages: "blogs/getTotalPages",
    }),
  },
  components: {
    Post,
  },
  watch: {
    $route() {
      this.$store.dispatch("blogs/getPosts", this.myCurrentPage);
    },
  },
  methods: {
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    },
    sharePost() {
      if (!this.myLogin) {
        alert("Login to post");
      } else {
        const token = this.getCookie("access_token");
        const payload = {
          body: {
            content: this.postContent,
            author_id: this.myCurrentUser.id,
          },
          token: token,
        };
        this.$store.dispatch("blogs/sharePost", payload, token);
      }
    },
    goToPage(nextPage) {
      if (nextPage > this.myTotalPages) {
        this.nextPage = this.myTotalPages;
      }
      this.$router.push({
        path: this.$route.path,
        query: {
          page: nextPage,
        },
      });
    },
  },
  mounted() {
    this.myCurrentPage = parseInt(this.$route.query.page);
    this.$store.dispatch("blogs/getPosts", this.myCurrentPage);
  },
};
</script>
