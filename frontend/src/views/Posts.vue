<template>
    <v-container class="page-container">

        <v-card>
            <v-text-field 
                label="What's puzzling you?" 
                v-model="newPost" 
                hide-details 
                counter="250"/>
            <span>
                <v-btn text style="width: 50%;" @click.prevent="todo">Add image</v-btn>
                <v-btn text style="width: 50%;" @click.prevent="post">Share</v-btn>
            </span>
        </v-card>

        <v-responsive class="justify-center">
            <div v-for="post in posts" :key="post.id">
                <Post v-bind:postContent="post"/>
            </div>
        </v-responsive>

        <v-spacer></v-spacer>

        <v-pagination 
            v-model="currentPage" 
            :length="totalPages" 
            :total-visible="7" 
            color="#42A5F5" 
            @input="handlePagination" 
            id="pagination"/>
    </v-container> 
</template>

<style>
  @import '../assets/styles/postspage.css';
</style>


<script>
import { APIService } from '../utils/APIService'
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
            newPost: "",
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
        todo() {
            alert("this function is not availale")
        },
        share() {
            const payload = {

            }
            apiService.post('posts/', payload).then(
                (response) => {
                    if (response.status == 201){
                        this.posts
                    }
                }
            )
        }
    },
    mounted(){
        this.onResize()
        this.getPosts()
    },
}
</script>