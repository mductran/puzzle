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
		<v-spacer></v-spacer>
		<v-btn @click.stop="login">
			Sign in
		</v-btn>
	</v-card>
</v-overlay>
</template>	

<script>
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import "vuetify/dist/vuetify.min.css"

import EventBus from "./EventBus"

require("../assets/styles/login.css")

Vue.use(Vuetify)

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
		},
		close() {
			EventBus.$emit('revealLoginOverlay')
		}
	},
    mounted() {
    }
}
</script>