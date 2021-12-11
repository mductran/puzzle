<template>
  <div>
    <v-card elevation="0" class="cat-bar">
      <v-btn text class="cat" @click.prevent="swap('recent')">
        Most recent
      </v-btn>
      <v-btn text class="cat" @click.prevent="swap('propose')">
        Propose
      </v-btn>
      <v-btn text class="cat" @click.prevent="swap('filter')">
        Find trade
      </v-btn>
      <v-btn text class="cat" @click.prevent="swap('listing')">
        Listing
      </v-btn>
    </v-card>

    <AdvanceFilter v-if="active.filter" class="container"/>
    <MostRecent v-if="active.recent" class="container"/>
    <Propose v-if="active.propose" class="container"/>
    <PublicListing v-if="active.listing" class="container"/>

  </div>
</template>

<style scoped>
@import "../assets/styles/trade.css";
</style>

<script>
import AdvanceFilter from "../components/trade/AdvanceFilter.vue";
import MostRecent from "../components/trade/MostRecent.vue";
import Propose from "../components/trade/Propose.vue";
import PublicListing from "../components/trade/PublicListing.vue";

export default {
  layout(context) {
    return "index";
  },
  components: {
    AdvanceFilter,
    MostRecent,
    Propose,
    PublicListing,
  },
  data: () => {
    return {
      active: {
        filter: false,
        recent: true,
        propose: false,
        listing: false,
      },
    };
  },
  methods: {
    swap(componentName) {
      // TODO: switch to lazy load
      Object.keys(this.active).forEach(i => this.active[i] = false)

      if (componentName === "filter") {
        this.active.filter = true;
      } else if (componentName === "recent") {
        this.active.recent = true
      } else if (componentName === "propose") {
        this.active.propose = true
      } else if (componentName === "listing") {
        this.active.listing = true
      }
    },
  },
};
</script>
