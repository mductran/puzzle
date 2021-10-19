<template>
  <div class="header">
	<v-toolbar dense class="fixed-bar" id="navbar">
		<v-btn class="logo-btn" plain>
			<v-img
				contain
				src="../assets/thuzzle-logo.png"
				:max-height="logoHeight"
				:max-width="logoWidth"
				@click="logoClick"
			></v-img>
		</v-btn>
		
		<v-spacer></v-spacer>

		<v-spacer></v-spacer>

		<v-btn text @click.stop="swapPage('Trade')"> Trade </v-btn>
		<v-btn text @click.stop="swapPage('Puzzle')"> For sale </v-btn>
		<v-btn text @click.stop="swapPage('Inventory')"> Inventory </v-btn>
		<v-btn v-if="!loggedIn" text @click.stop="revealLogin"> Sign in </v-btn>
		
		<v-menu v-if="loggedIn" offset-y bottom open-on-hover>
			<template v-slot:activator="{ on }">
				<v-btn text v-on="on"> {{ username }} </v-btn>
			</template>
			<v-list>
				<v-list-item text @click.stop="swapPage('AccountDetail')">
					Your Profile
				</v-list-item>
				<v-list-item text @click.stop="logout">
					Logout
				</v-list-item>
			</v-list>
		</v-menu>
	</v-toolbar>  
  </div>
</template>

<style>
@import "../assets/styles/header.css";
</style>

<script>
import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/dist/vuetify.min.css";

import EventBus from "./EventBus";
import { CookiesUtils } from '../utils/CookiesUtils'
import { APIService } from '../utils/APIService';

Vue.use(Vuetify)
const cookiesUtils = new CookiesUtils()
const apiService = new APIService()

export default {
	name: "Header",
	icons: {
		iconfont: 'mdiSvg', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
	},
	data() {
		return {
			logoWidth: 0,
			logoHeight: 0,
			loggedIn: false,
			username: "",
			menuItems: [
				{"text": "Your Profile", "page": "AccountDetails"},
				{"text": "Your Storefront", "page": "YourStore"},
			]
		};
	},
	methods: {
		resizeLogo() {
			this.logoHeight = document.getElementById("navbar").offsetHeight;
			this.logoWidth = document.getElementById("navbar").offsetWidth * 0.1
		},
		logoClick() {
			window.location.href = "http://localhost:8080/"
		},
		revealLogin() {
			EventBus.$emit("revealLoginOverlay")
		},
		swapPage(page) {
			EventBus.$emit("swapPage", page)
		},
		swapLoginButton(value) {
			this.loggedIn = true
			this.username = value
		},
		getCurrentUser() {
			let accessToken = cookiesUtils.getCookie("accessToken")
			if (accessToken) {
				this.loggedIn = true
				this.username = apiService.parseJwt(accessToken)['username']
			}
		},
		logout() {
			this.loggedIn = false
			cookiesUtils.deleteCookie("accessToken")
			cookiesUtils.deleteCookie("refreshToken")
			window.location.href = "http://localhost:8080/"
		}
	},
	mounted() {
		this.resizeLogo()
		this.getCurrentUser()
		EventBus.$on("loggedInSuccessfully", this.swapLoginButton)
	},
	destroyed() {
		EventBus.off("loggedInSuccessfully")
	},
};
</script>

