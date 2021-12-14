<template>
    <div>
      <h3> Search result for: {{this.query['query']}}</h3>
    </div>
</template>

<script>
import Vue from 'vue'
import Vuetify from 'vuetify'

import Post from '../components/Post.vue'

Vue.use(Vuetify)

export default {
  components: {
    Post,
  },
  
}
</script>