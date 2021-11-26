<template>
    <v-container class="page-container">
      <v-responsive class="justify-center">
        <div v-for="post in this.$store.state.blogs.posts" v-bind:key="post.id">
          <Post v-bind:postContent="post"/>
        </div>
      </v-responsive>
    </v-container>
</template>

<style scoped>
@import "../assets/styles/posts.css";
</style>

<script>
import Vue from 'vue'
import Vuetify from 'vuetify'
import Post from '../components/Post.vue'

Vue.use(Vuetify)

export default {
  components: {
    Post
  },
  layout(context) {
    return 'blog'
  },
  mounted() {
    this.$store.dispatch("blogs/getPosts")
  }
}

</script>
