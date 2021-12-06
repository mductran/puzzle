<template>
  <v-card justify-center outlined class="post-card">
    <v-card-title> @{{ postContent.author_name }} </v-card-title>
    <v-card-subtitle> {{ getMoment(postContent.updated) }} </v-card-subtitle>
    <v-card-text> {{ postContent.content }} </v-card-text>
    <v-img
      contain
      :height="imageHeight"
      :src="postContent.image"
      class="post-image"
    />

    <v-card-actions>
      <v-btn text style="width: 50%"> React </v-btn>
      <v-btn text @click="reveal = !reveal" style="width: 50%">
        Comments
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <v-card
        v-if="reveal"
        outlined
        color="rgba(0,0,0,0)"
        class="transition-fast-in-fast-out comment-section"
      >
        <Comment v-bind:commentContent="postContent.comments" />
        <div class="submit-comment" v-if="myLogin">
          <v-text-field autocomplete="off" v-model="userComment" />
          <v-btn text @click.stop.prevent="submitComment"> Submit </v-btn>
        </div>
      </v-card>
    </v-expand-transition>
  </v-card>
</template>

<style scoped>
@import "../assets/styles/post.css";
</style>

<script>
import { mapGetters } from "vuex";
import Comment from "../components/Comment.vue";
import moment from "moment";

export default {
  name: "Post",
  components: {
    Comment,
  },
  props: {
    postContent: Object,
    imageHeight: Number,
    postWidth: Number,
  },
  data() {
    return {
      reveal: false,
      userComment: "",
    };
  },
  computed: {
    ...mapGetters({
      myLogin: "users/getLogin",
      myCurrentUser: "users/getCurrentUser",
    }),
  },
  methods: {
    getMoment(datetime) {
      return moment(datetime).fromNow();
    },
    submitComment() {
      const payload = {
        content: this.userComment,
        post_id: this.postContent.id,
        author_id: this.myCurrentUser.id,
      };
      this.$store.dispatch("blogs/shareComment", payload);
      this.userComment = "";
    },
  },
};
</script>

