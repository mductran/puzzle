<template>
	<div name="app">
		<Header/>
		<component :is="page"></component>
		<Login v-bind:show="overlay"/>
		<Footer/>
	</div>
</template>

<script>
import EventBus from './components/EventBus'
import Login from './components/Login.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

import PostsPage from './pages/PostPage.vue'
import Puzzle from './pages/Puzzle.vue'
import Trade from './pages/Trade.vue'
import YourStore from './pages/YourStore.vue'

import "vuetify/dist/vuetify.min.css"


export default {
	name: 'App',
	components: {
		Header,
		Footer,
		PostsPage,
		Login,
		Puzzle,
		Trade,
		YourStore
	},
	data: () => ({
		overlay: false,
		page: "PostsPage"
	}),
	methods: {
		revealLoginOverlay() {
			this.overlay = !this.overlay
		},
		swapPage(newPage) {
			console.log("receive page", newPage)
			this.page = newPage
		}
	},
	mounted() {
		EventBus.$on("revealLoginOverlay", this.revealLoginOverlay)
		EventBus.$on("swapPage", this.swapPage)
	},
	destroyed() {
		EventBus.off("revealLoginOverlay")
		EventBus.off("swapPage")
	},
}
</script>
