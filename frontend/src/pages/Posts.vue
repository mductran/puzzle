<template>
    <v-container>
        <v-responsive class="justify-center">
            <div v-for="post in posts" :key="post.id">
                <Post v-bind:postContent="post"/>
            </div>    
        </v-responsive>

        <v-spacer></v-spacer>

        <v-pagination v-model="currentPage" :length="totalPages" :total-visible="7" color="#42A5F5" @input="handlePagination" id="pagination">
        </v-pagination>
    </v-container> 
</template>

<style>
  @import '../assets/styles/postspage.css';
</style>


<script>
import "vuetify/dist/vuetify.min.css"

import {APIService} from '../utils/APIService'
import Post from '../components/Post.vue'

require ("../assets/styles/postspage.css")


const apiService = new APIService()

export default {
    name: "Posts",
    components: {
        Post,
    },
    data() {
        return {
            posts: {},
            numberOfPosts: 0,
            totalPages: 0,
            currentPage: 1,
        }
    },
    methods: {
        getPosts(){
            apiService.getItems("posts", this.currentPage).then(
                (response) => {
                    this.numberOfPosts = response.results.length
                    this.totalPages = response.total_pages
                    this.posts = response.results
                }
            )
        },
        onResize () {
            this.windowSize = { x: window.innerWidth, y: window.innerHeight }
            this.postHeight = 0.4*this.windowSize.innerHeight
            this.imageHeight = 0.5*this.windowSize.innerHeight
        },
        handlePagination(value) {
            this.currentPage = value
            this.getPosts()
            window.scrollTo({top: 0, behavior: "smooth"})
        },
    },
    mounted(){
        this.onResize()
        this.getPosts()
    },
}
</script>