<template>
 <div class="posts-container" id="posts-container">
    <v-container>
        <v-responsive :width="0.6*$vuetify.breakpoint.width" class="justify-center">
            <v-card v-for="post in posts" :key="post.id" justify-center>
                <v-card-title> {{post.author_name}} </v-card-title>
                <v-card-text> {{post.content}} </v-card-text>
                <v-img height=125 :src="post.image"></v-img>
            </v-card>
        </v-responsive>

        <v-spacer></v-spacer>

        <v-pagination v-model="currentPage" :length="totalPages" :total-visible="7" color="#42A5F5" @input="handlePagination" circle id="pagination">
        </v-pagination>

    </v-container> 
 </div>
</template>

<style>
  @import '../assets/styles/posts.css';
</style>


<script>
import {APIService} from '../api/APIService'
import "vuetify/dist/vuetify.min.css"

require ("../assets/styles/posts.css")


const apiService = new APIService()

export default {
    name: "Posts",
    components: {},
    data(){
        return {
            posts: [],
            columns: [],
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
                    this.posts = response.results
                    this.totalPages = response.total_pages
                }
            )
        },
        onResize () {
            this.windowSize = { x: window.innerWidth, y: window.innerHeight }
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