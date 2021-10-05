<template>
  <div name="app">
    <Header/>
    <PostsPage/>
    <Footer/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

import PostsPage from './pages/PostPage.vue'

import "vuetify/dist/vuetify.min.css"


export default {
  name: 'App',
  components: {
    Header,
    PostsPage,
    Footer
  },
  data: () => ({
    //
  }),
}
</script>
