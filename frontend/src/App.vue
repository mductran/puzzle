<template>
	<div name="app">
		<v-app>
			<Header/>
			<div class="page-container">
				<component :is="page"></component>			
			</div>
			<Login v-bind:show="overlay"/>
			<Footer/>
		</v-app>
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
import AccountDetail from './pages/AccountDetails.vue'
import Register from './pages/Register.vue'

import Vue from 'vue'
import Vuetify from 'vuetify'
import "vuetify/dist/vuetify.min.css"

require("./assets/styles/app.css")

Vue.use(Vuetify)

export default {
	name: 'App',
	components: {
		Header,
		Footer,
		PostsPage,
		Login,
		Puzzle,
		Trade,
		YourStore,
		AccountDetail,
		Register,
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
			this.page = newPage
		},
		closeLoginBox() {
			this.overlay = false
		}
	},
	mounted() {
		EventBus.$on("revealLoginOverlay", this.revealLoginOverlay)
		EventBus.$on("loggedInSuccessfully", this.closeLoginBox)
		EventBus.$on("swapPage", this.swapPage)
	},
	destroyed() {
		EventBus.off("revealLoginOverlay")
		EventBus.off("loggedInSuccessfully")
		EventBus.off("swapPage")
	},
}
</script>
