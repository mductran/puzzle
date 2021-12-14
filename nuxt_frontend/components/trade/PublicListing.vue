<template>
  <div>
    <h2>All listing</h2>
    <br />

    <div
      v-for="trade in this.myTrades"
      v-bind:key="trade.id"
      class="trade-listing"
    >
      <Trade v-bind:tradeContent="trade" />
    </div>

    <v-pagination
      circle
      v-model="myCurrentPage"
      :length="myTotalPages"
      :total_visible="3"
      color="#42a5f5"
      @input="goToPage"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Vue from "vue";
import Vuetify from "vuetify";

Vue.use(Vuetify);

export default {
  layout(context) {
    return "index";
  },
  data: () => {
    return {
      myCurrentPage: 1,
    };
  },
  computed: {
    ...mapGetters({
      myTrades: "trades/getTrades",
      myTotalPages: "trades/getTotalPages",
    }),
  },
  watch: {
    $route() {
      this.$store.dispatch("trades/getTrades", this.myCurrentPage);
    },
  },
  methods: {
    goToPage(nextPage) {
      if (nextPage > this.myTotalPages) {
        this.nextPage = this.myTotalPages;
      }
      this.$router.push({
        path: this.$route.path,
        query: {
          page: nextPage,
        },
      });
    },
  },
  mounted() {
    this.myCurrentPage = parseInt(this.$route.query.page);
    this.$store.dispatch("trades/getTrades", this.myCurrentPage);
  },
};
</script>
