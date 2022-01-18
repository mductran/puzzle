<template>
  <v-container>
    <h1>Popular Sets</h1>

    <Popular/>
  </v-container>
</template>

<script>
import Popular from "../components/Popular.vue";

export default {
  layout() {
    return "index";
  },
  components: {
    Popular,
  },
};
</script>