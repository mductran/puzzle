<template>
	<v-overlay v-if="show">
		<v-card outlined :light=true min-width="500px">
			<v-card-title>
				<span>Login Panel</span>
				<v-spacer></v-spacer>
				<v-btn icon @click.stop="close">
					x
				</v-btn>
			</v-card-title>
	
			<p v-if="incorrect" style="color: red;"> Incorrect username or password </p>
			<br>
	
			<v-text-field label="Username" v-model="username" class="shrink mx-4">
			</v-text-field>
			<v-text-field label="Password" v-model="password" :append-icon="visiblePwd ? 'mdi-eye' : 'mdi-eye-off'" :type="visiblePwd ? 'text' : 'password'" @click:append="visiblePwd = !visiblePwd" class="shrink mx-4"></v-text-field>
	
			<a href="https://www.google.com/search?channel=fs&q=how+to+reset+password" style="color: blue; margin: 1rem;">Forgot your password?</a>
	
			<br>
	
			<v-card-actions>
				<v-btn text style="width: 50%;" @click.stop="register">
					Register
				</v-btn>
				<v-btn text style="width: 50%;" @click.stop="login">
					Login
				</v-btn>
			</v-card-actions>
	
		</v-card>
	</v-overlay>
</template>

<style>
@import "../assets/styles/login.css";
</style>

<script>
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import EventBus from "./EventBus"
import { APIService } from "../utils/APIService"

Vue.use(Vuetify)
const apiService = new APIService()

export default {
	name: "Login",
	props: {
		show: Boolean,
	},
	computed: {
		closeLoginBox() {
			return this.loggedIn
		}
	},
	data() {
		return {
			username: '',
			password: '',
			visiblePwd: false,
			incorrect: false,
			rules: {
				required: value => !!value || "Required",
			},
		}
	},
	methods: {
		login() {
			apiService.post('login', { 'username': this.username, 'password': this.password }).then(
				(response) => {
					if (response.status == 200) {
						var userId = apiService.parseJwt(response.data['access'])['user_id']
						apiService.getItem('accounts', userId, response.data['access']).then(
							(response) => {
								this.username = response['username']
							}
						)
						var expires = (new Date(Date.now() + 86400 * 1000)).toUTCString();
						EventBus.$emit('loggedInSuccessfully', this.username)
						document.cookie = "accessToken=" + response.data['access'] + "; expire=" + expires + 5 * 60
					} else {
						this.incorrect = true
					}
				}
			)
		},
		register() {
			this.close()
			EventBus.$emit("swapPage", "Register")
		},
		close() {
			EventBus.$emit('revealLoginOverlay')
		}
	},
	mounted() {}
}
</script>