<template>
  <div class="user-layout">

    <header>
		  <v-toolbar dense class="fixed-bar" id="navbar">

        <NuxtLink :to="this.$store.state.users.loggedIn ? '/' : '/index'">
          <v-img contain :src="logoSource" :max-width="logoWidth" :max-height="logoHeight"/>
        </NuxtLink>
	
        <v-spacer/>
	
        <div class="search-bar" :max-height="logoHeight">
          <v-text-field 
            v-model="query" 
            append-outer-icon="mdi-magnify"
            prepend-icon="mdi-filter-variant"
            @click:append-outer="search"
            class="searchbar-element"/>
        </div>
	
        <v-spacer/>

        <router-link to="/trade">
          <v-btn text>Trade</v-btn>
        </router-link>
        <router-link to="/puzzle">
          <v-btn text>Puzzle</v-btn>
        </router-link>

        <v-btn text> Sign In </v-btn>

      </v-toolbar>
    </header>

    <Nuxt/>

    <div class="footer">
    </div>
  
  </div>
</template>

<style scoped>
@import "../assets/styles/header.css";
</style>

<script>
export default {
  data: () => {
    return {
      logoSource: require("../assets/thuzzle-logo.png"),
      logoHeight: 0,
		  logoWidth: 0,
      query: ""
    }
  },
  methods: {
    resizeLogo() {
			this.logoHeight = document.getElementById("navbar").offsetHeight
			this.logoWidth = document.getElementById("navbar").offsetWidth * 0.2
		},
    constructParams() {
			return {
				'content': this.query,
				'author__user__username': '',
			}
		},
    search() {
      const params = this.constructParams()
      console.log('searching', params)
    }
  },
  mounted() {
		this.resizeLogo()
	},
}
</script>