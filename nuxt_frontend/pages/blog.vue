<template>
    <v-container class="page-container">
      <v-responsive class="justify-center">
        <div v-for="post in this.myPosts" v-bind:key="post.id">
          <Post v-bind:postContent="post"/>
        </div>
      </v-responsive>
    </v-container>
</template>

<style scoped>
@import "../assets/styles/posts.css";
</style>

<script>
import { mapGetters } from 'vuex'

import Vue from 'vue'
import Vuetify from 'vuetify'
import Post from '../components/Post.vue'

Vue.use(Vuetify)

export default {
  layout(context) {
    return "index"
  },
  data: () => {
    return {
      layoutName: ""
    }
  },
  computed: {
    ...mapGetters({
      myPosts: "blogs/getPosts",
      myTotalPages: "blogs/getTotalPages",
      myCurrentPost: "blogs/getCurrentPost",
      myCurrentPage: "blogs/getCurrentPage",
    }) 
  },
  components: {
    Post
  },
  methods: {

  },
  created() {
    this.$store.dispatch("blogs/getPosts")
    // this.layoutName = Object.keys(this.$store.state.users.currentUser).length > 0  ? "user" : "anonymous"
    // this.$nuxt.setLayout(this.layoutName)
  }
}

</script>
