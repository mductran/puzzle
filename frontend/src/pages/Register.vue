<template>
<v-form lazy-validation>
    <h1>Create your account</h1>
    <v-text-field 
        v-model="username" 
        :error-messages="usernameErrors" 
        label="username" 
        required 
        @input="$v.username.$touch()"
        @blur="$v.username.$touch()"
    ></v-text-field>
    <v-text-field 
        v-model="email" 
        :error-messages="emailErrors" 
        label="email" 
        required 
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
    ></v-text-field>
    <v-text-field 
        v-model="password1" 
        :error-messages="password1Errors" 
        label="password" 
        required 
        @input="$v.password1.$touch()"
        @blur="$v.password1.$touch()"
    ></v-text-field>
    <v-text-field 
        v-model="password2" 
        :error-messages="password2Errors" 
        label="re-enter password" 
        required 
        @input="$v.password2.$touch()"
        @blur="$v.password2.$touch()"
    ></v-text-field>
    <br>
    <v-btn class="mr-4" @click.stop="validate">
        Register
    </v-btn>
</v-form>
</template>

<script>
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import { validationMixin } from 'vuelidate'
import { required, minLength, email, sameAs, helpers } from 'vuelidate/lib/validators'

// import { APIService } from '../utils/APIService'

Vue.use(Vuelidate);

// const apiService = new APIService()

const containUpper = helpers.regex("containUpper", /[A-Z]/)
const containLower = helpers.regex("containLower", /[a-z]/)
const containDigit = helpers.regex("containDigit", /[0-9]/)
const containSpecialChars = helpers.regex("containSpecialChars", /(?![<>$^])\W|_/)
const containIllegalChars = helpers.regex("containIllegalChars", /^[<>$%]/)

export default {
    mixins: {
        validationMixin
    },
    validations: {
        username: { required },
        email: { required, email },
        password1: {
            required, 
            minLength: minLength(8), 
            containUpper,
            containLower, 
            containSpecialChars, 
            containDigit, 
            containIllegalChars
        },
        password2: { required, sameAs: sameAs('password1')}
    },
    computed: {
        usernameErrors() {
            const errors = []
            if (!this.$v.username.$dirty) return errors
            !this.$v.username.required && errors.push('This field is required.')
            return errors
        },
        emailErrors() {
            const errors = []
            if (!this.$v.email.$dirty) return errors
            !this.$v.email.required && errors.push('This field is required.')
            !this.$v.email.email && errors.push('This is not a valid email address.')
            return errors
        },
        password1Errors() {
            const errors = []
            if (!this.$v.password1.$dirty) return errors
            !this.$v.password1.required && errors.push('This field is required.')
            !this.$v.password1.minLength && errors.push('Must contain at least 8 characters.')            
            console.log(this.$v.password1)
            !this.$v.password1.containUpper && errors.push('Your password must contain at least one uppercase letter')
            !this.$v.password1.containLower && errors.push('Your password must contain at least one lowercase letter')
            !this.$v.password1.containSpecialChars && errors.push('Your password must contain at least one special characters')
            !this.$v.password1.containDigit && errors.push('Your password must contain at least one digit')
            this.$v.password1.containIllegalChars && errors.push('Your password must not contain any illegal characters <>$%')
            return errors
        },
        password2Errors() {
            const errors = []
            if (!this.$v.password2.$dirty) return errors
            !this.$v.password2.required && errors.push('This field is required.')
            !this.$v.password2.sameAs && errors.push("Passwords don't match.")
            return errors
        }
    },
    data() {
        return {
            username: "",
            email: "",
            password1: "",
            password2: "",
        }
    },
    methods: {
        validate() {
            console.log(this.$refs)
        }
    },
    mounted() {
    }
}
</script>