<template>
    <div id="search-bar" ref="searchBar">
        <v-text-field 
            v-model="searchQuery" 
            prepend-icon="filter" 
            append-icon="search"
            @click:append="search"
            id="search-field"/>
    </div>
</template>

<style scoped>
@import "../assets/styles/searchbar.css";
</style>

<script>
import Vue from 'vue'
import Vuetify from 'vuetify'
// import { APIService } from '../utils/APIService'

Vue.use(Vuetify)

// const apiService = new APIService

export default ({
    data() {
        return {
            searchQuery: "",
        }
    },
    methods: {
        search() {
            
        }
    }
})
</script>
