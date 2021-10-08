<template>
<v-overlay v-if="show">
	<v-card outlined :light="true" min-width="500px">
		<v-card-title>
			<span>Login Panel</span>
			<v-spacer></v-spacer>
			<template>
                <v-btn icon @click.stop="close">
					<v-icon>mdi-window-close</v-icon>
                </v-btn>
			</template>
		</v-card-title>
		<v-text-field outlined label="Username" v-model="name">username</v-text-field>
		<v-text-field outlined label="Password" v-model="password" :append-icon="visiblePwd ? 'mdi-eye' : 'mdi-eye-off'"  @click:append="visiblePwd = !visiblePwd" :type="visiblePwd ? 'text' : 'password'">
			password
		</v-text-field>

		<a href="https://www.google.com/search?channel=fs&q=how+to+reset+password" style="color: blue;">Forgot your password?</a>
		
		<br><br>
        
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

<script>
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import "vuetify/dist/vuetify.min.css"

import EventBus from "./EventBus"
import {APIService} from "../api/APIService"

require("../assets/styles/login.css")

Vue.use(Vuetify)
const apiService = new APIService()

export default {
    name: "Login",
	props: {
		show: Boolean,
	},
    data(){
      return {
		name: '',
		password: '',
		visiblePwd: false,
		rules: {
				required: value => !!value || "Required",
		},
      }
    },
    methods: {
		login() {
			console.log('credentials', this.name, this.password)
			apiService.login(this.name, this.password).then(
				(response) => {
					console.log(response)
				}
			)
		},
		register() {
			console.log('registering')
		},
		close() {
			EventBus.$emit('revealLoginOverlay')
		}
	},
    mounted() {
    }
}
</script>