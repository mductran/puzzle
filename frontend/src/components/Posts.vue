<template>
 <div class="posts-container" id="posts-container">
    <v-container>
        <v-responsive :width="0.6*$vuetify.breakpoint.width" class="justify-center">
            <v-card v-for="post in posts" :key="post.id" justify-center outlined class="card">
                <v-card-title> {{post.author_name}} </v-card-title>
                <v-card-subtitle style="text-transform: capitalize;"> {{ calcMoment(post.updated) }} </v-card-subtitle>
                <v-card-text> {{post.content}} </v-card-text>
                <v-img contain :height="0.6*$vuetify.breakpoint.height" :src="post.image" class="post-image"></v-img>
            </v-card>
            <v-divider class="mx-4"></v-divider>
        </v-responsive>

        <v-spacer></v-spacer>

        <v-pagination v-model="currentPage" :length="totalPages" :total-visible="7" color="#42A5F5" @input="handlePagination" id="pagination">
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
import moment from 'moment'

require ("../assets/styles/posts.css")


const apiService = new APIService()

export default {
    name: "Posts",
    components: {},
    data(){
        return {
            posts: {},
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
                    this.totalPages = response.total_pages
                    response.results.forEach(element => {
                        console.log(element)
                    });
                    this.posts = response.results
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
        calcMoment(datetime) {
            return moment(datetime).fromNow();
        }
    },
    mounted(){
        this.onResize()
        this.getPosts()
    },
}
</script>