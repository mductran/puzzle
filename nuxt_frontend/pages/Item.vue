<template>
  <div>
    <v-card>
      <v-img src="" />
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

import Vue from "vue"
import Vuetify from "vuetify"

Vue.use(Vuetify)

export default {
  layout(context) {
    return "index"
  },
}
</script>