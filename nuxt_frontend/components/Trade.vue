<template>
  <div>
    <v-card elevation="1">
      <v-card-title> {{ tradeContent.item_name }} </v-card-title>
      <v-card-subtitle> From @{{ tradeContent.author_name }} </v-card-subtitle>
      <v-card-subtitle> {{ getMoment(tradeContent.updated) }} </v-card-subtitle>

      <v-expand-transition>
        <v-card
          v-if="this.myLogin"
          outlined
          color="rgba(0,0,0,0)"
          class="transition-fast-in-fast-out comment-section"
        >
          <div class="submit-comment" v-if="myLogin">
            <v-btn text @click.stop.prevent="alert('redirect to offer page')">
              Offer
            </v-btn>
          </div>
        </v-card>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Offer from "./Offer.vue";
import moment from "moment";

export default {
  name: "Trade",
  components: {
    Offer,
  },
  data: () => {
    return {};
  },
  computed: {
    ...mapGetters({
      myLogin: "users/getLogin",
    }),
  },
  props: {
    tradeContent: Object,
  },
  methods: {
    getMoment(datetime) {
      return moment(datetime).fromNow();
    },
  },
};
</script>