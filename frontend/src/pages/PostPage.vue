<template>
 <div class="posts-container" id="posts-container">
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
 </div>
</template>

<style>
  @import '../assets/styles/postspage.css';
</style>


<script>
import {APIService} from '../api/APIService'
import "vuetify/dist/vuetify.min.css"

import Post from '../components/Post.vue'

require ("../assets/styles/postspage.css")


const apiService = new APIService()

export default {
    name: "PostsPage",
    components: {
        Post,
    },
    data(){
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
                    // response.results.forEach(element => {
                    //     console.log(element)
                    // })
                    this.posts = response.results
                    console.log("POSTS", this.posts)
                }
            )
        },
        onResize () {
            this.windowSize = { x: window.innerWidth, y: window.innerHeight }
            this.cardWidth = 0.6*this.windowSize.innerWidth
            this.imageHeight = 0.5*this.windowSize.innerHeight
            console.log('image height source', this.imageHeight)
        },
        handlePagination(value) {
            this.currentPage = value
            this.getPosts()
            document.body.scrollTop = 0; // Safari scroll top
            document.documentElement.scrollTop = 0; // Chrome, FF scroll top
        },
    },
    mounted(){
        this.onResize()
        this.getPosts()
    },
}
</script>