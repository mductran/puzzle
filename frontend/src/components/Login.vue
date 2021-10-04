<template>
    <v-form v-model="valid" lazy-validation>
        <v-text-field v-model="name" :rules="nameRules" label="Name" required>
        </v-text-field>

        <v-text-field v-model="password" :rules="passwordRules" label="Password" required>
        </v-text-field>


    </v-form>
</template>

<script>
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import "vuetify/dist/vuetify.min.css"

Vue.use(Vuetify)

export default {
    name: "Login",
    data(){
      return {
          name: '',
          password: '',
          rules: {
            required: value => !!value || "Required",
            length: value => value.length >= 8 || "Password must has at least 8 characters.",
          }
      }
    },
    methods: {
    },
    mounted() {
    }
}
</script>