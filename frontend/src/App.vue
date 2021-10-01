<template>
  <div name="app">
    <Header/>
    <Posts/>
    <Footer/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

import Posts from './components/Posts.vue'

import "vuetify/dist/vuetify.min.css"


export default {
  name: 'App',
  components: {
    Header,
    Posts,
    Footer
  },
  data: () => ({
    //
  }),
}
</script>
