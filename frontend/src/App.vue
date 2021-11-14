<template>
	<div name="app">
		<v-app>
			<header>
				<v-toolbar dense class="fixed-bar" id="navbar">
					<v-btn plain class="logo-btn">
						<v-img contain src="./assets/thuzzle-logo.png" :max-width="logoWidth" :max-height="logoHeight" @click="logoClick" />
					</v-btn>
	
					<v-spacer/>
	
					<div id="search-bar">
						<v-text-field v-model="query" id="search-field" />
						<router-link :to="{name: 'SearchResult', params: {...constructParams()}, query: {'query': query}}">
							<v-btn text id="search-btn">
								Search
							</v-btn>
						</router-link>
					</div>
	
					<v-spacer/>
	
					<router-link to="/trade">
						<v-btn text>Trade</v-btn>
					</router-link>
					<router-link to="/puzzle">
						<v-btn text>Puzzle</v-btn>
					</router-link>
	
					<v-btn text v-if="!loggedIn" @click.stop="revealLogin"> Sign In </v-btn>
					<v-menu v-if="loggedIn" offset-y bottom open-on-hover>
						<template v-slot:activator="{ on }">
										<v-btn text v-on="on"> {{ getUsername() }} </v-btn>
</template>
						<v-list>
							<v-list-item text>
								<router-link to="/account">
									Your Profile
								</router-link>
							</v-list-item>
							<v-list-item text @click="logout">
								Logout
							</v-list-item>
						</v-list>
					</v-menu>
				</v-toolbar>
			</header>

			<router-view/>

			<Login v-bind:show="overlay"/>

			<Footer/>

		</v-app>
	</div>
</template>

<style>
@import "./assets/styles/header.css";
@import "./assets/styles/app.css";
@import "./assets/styles/searchbar.css";
</style>

<script>
import Vuetify from 'vuetify'
import Vue from 'vue'

import { APIService } from './utils/APIService'
import { CookiesUtils } from './utils/CookiesUtils'
import EventBus from "./utils/EventBus"

import Login from './components/Login.vue'
import Footer from './components/Footer.vue'

Vue.use(Vuetify)
const apiService = new APIService()
const cookiesUtils = new CookiesUtils()

export default ({
	name: "App",
	components: {
		Login,
		Footer,
	},
	data: () => ({
		logoHeight: 0,
		logoWidth: 0,
		loggedIn: false,
		overlay: false,
		username: "",
		query: "",
	}),
	methods: {
		logoClick() {
			window.location.href = "http://localhost:8080/"
		},
		resizeLogo() {
			this.logoHeight = document.getElementById("navbar").offsetHeight
			this.logoWidth = document.getElementById("navbar").offsetWidth * 0.1
		},
		logout() {
			this.loggedIn = false
			cookiesUtils.deleteCookie("access_token")
			cookiesUtils.deleteCookie("refresh_token")
			cookiesUtils.deleteCookie("username")
			window.location.href = "http://localhost:8080/"
		},
		revealLogin() {
			this.overlay = !this.overlay
		},
		userLoggedIn() {
			this.overlay = !this.overlay
			this.loggedIn = !this.loggedIn
		},
		getUsername() {
			return cookiesUtils.getCookie('username')
		},
		checkLogin() {
			const accessToken = cookiesUtils.getCookie("access_token")
			if (accessToken) {
				if (apiService.validateToken(accessToken)) {
					this.loggedIn = true
					this.username = apiService.parseJwt(accessToken)['username']
				}
			}
			if (this.loggedIn == false) {
				// alert("you've been logged out, please sign in again")
			}
		},
		constructParams() {
			return {
				'content': this.query,
				'author__user__username': '',
			}
		},
	},
	mounted() {
		this.checkLogin()
		this.resizeLogo()
		EventBus.$on("revealLoginOverlay", this.revealLogin)
		EventBus.$on("loggedInSuccessfully", this.userLoggedIn)
	},
	destroyed() {
		EventBus.off("revealLoginOverlay")
		EventBus.off("loggedInSuccessfully")
	},
})
</script>