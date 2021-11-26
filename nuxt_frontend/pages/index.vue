<template>
  <div id="banner">
    <div class="header"></div>
    <h1>Landing page</h1>
    <ol>
      <li>
        <NuxtLink to="/register"> Register </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/blog"> Blog </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/swap"> Trading </NuxtLink>
      </li>
    </ol>

    <Post v-bind:postContent="test_post"/>

  </div>
</template>

<script>
import Post from '../components/Post.vue'


export default {
  components: {
    Post,
  },
  data: () => {
    return {
      test_post: {
        id: 5,
        author_name: "brapley2p",
        content: "Aliquam quis turpis eget elit sodales scelerisque.",
        created: "2020-09-25T01:38:36Z",
        updated: "2020-09-25T01:38:36Z",
        comments: [
          {
            id: 28,
            content:
              "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
            created: "2020-10-25T10:31:43Z",
            updated: "2020-10-25T10:31:43Z",
            author_id: 158,
            post_id: 5,
            author_name: "cbechley4d",
          },
          {
            id: 340,
            content:
              "Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
            created: "2021-05-12T01:18:41Z",
            updated: "2021-05-12T01:18:41Z",
            author_id: 647,
            post_id: 5,
            author_name: "ayendlehy",
          },
          {
            id: 1243,
            content: "new comment",
            created: "2021-11-09T09:34:24.907953Z",
            updated: "2021-11-09T09:34:24.908000Z",
            author_id: 1001,
            post_id: 5,
            author_name: "ductran",
          },
        ],
      }
    }
  },
};
</script>
