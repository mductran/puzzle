<template>
  <div id="banner">
    <div class="header"></div>
    <h1>Landing page</h1>
    <ol>
      <li>
        <NuxtLink :to="{ path: 'register' }">
          <v-btn text> Register </v-btn>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="{ path: 'blog', query: { page: 1 } }">
          <v-btn text> Blog </v-btn>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="{ path: 'trade', query: {page: 1 } }">
          <v-btn text> Trade </v-btn>
        </NuxtLink>
      </li>
    </ol>

  </div>
</template>

<script>
import Post from "../components/Post.vue";

export default {
  layout(context) {
    return "guest";
  },
  components: {
    Post,
  },
  data: () => {
    return {
    };
  },
};
</script>
