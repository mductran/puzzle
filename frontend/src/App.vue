<template>
  <div name="app">
    <Header/>
    <Posts/>
  </div>
</template>

<script>
import Posts from './components/Posts.vue'
import Header from './components/Header.vue'

import "vuetify/dist/vuetify.min.css"


export default {
  name: 'App',
  components: {
    Header,
    Posts
  },
  data: () => ({
    //
  }),
}
</script>
