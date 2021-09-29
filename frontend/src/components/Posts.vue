<template>
 <div class="posts-container">
    <v-container>
        <v-responsive :width="0.6*$vuetify.breakpoint.width" class="justify-center">
            <v-card v-for="post in posts" :key="post.id" justify-center>
                <v-card-title> {{post.author_name}} </v-card-title>
                <v-card-text> {{post.content}} </v-card-text>
                <v-img height=125 :src="post.image"></v-img>
            </v-card>
        </v-responsive>

        <v-spacer></v-spacer>

        <v-pagination v-model="total_pages" :length="10">
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
            total_pages: 0,
        }
    },
    methods: {
        getPosts(){
            apiService.getItems("posts").then(
                (response) => {
                    this.numberOfPosts = response.results.length
                    this.posts = response.results
                    this.total_pages = response.total_pages
                }
            )
        },
        onResize () {
            this.windowSize = { x: window.innerWidth, y: window.innerHeight 
        }
    }
    },
    mounted(){
        this.onResize()
        this.getPosts()
    },
}
</script>