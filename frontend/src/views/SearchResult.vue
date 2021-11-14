<template>
    <div id="search-result">
        <h3>Displaying result for: {{ this.query['query'] }} </h3>

        <div v-for="result in results" :key="result.id">
            <Post v-bind:postContent="result"/>
        </div>

    </div>
</template>

<script>
import Vuetify from 'vuetify'
import Vue from 'vue'

import Post from '../components/Post.vue'

import { APIService } from '../utils/APIService'

const apiService = new APIService()

Vue.use(Vuetify)

export default ({
    components: {
        Post,
    },
    data() {
        return {
            query: this.$route.query,
            params: this.$route.params,
            results: {}
        }
    },
    methods: {
        clean(text) {
            if (text === "") {
                return text
            }
            return text.replace(" ", "+")
        },
        search() {
            console.log("search params", this.params)
            apiService.filter('posts', this.params).then(
                (response) => {
                    console.log('filter response', response)
                    this.results = response.results
                }
            )
        }
    },
    mounted() {
        this.search()
    }
})
</script>
