<template>
    <div>
        <div v-for="comment in commentContent" :key="comment.id" class="comment-card">
            <div class="comment-title">
                <p> @{{ comment.author_name}} </p>
                <v-icon v-if="currentUserIsAuthor(comment.author_id)" @click.prevent="loadMenu">
                    three-vertical-dots
                </v-icon>
            </div>
            <p> {{ getMoment(comment.updated) }} </p>
            <p> {{ comment.content }} </p>
        </div>
    </div>
</template>

<style>
@import "../assets/styles/comment.css";
</style>

<script>
import moment from 'moment'
import Vue from 'vue'
import Vuetify from 'vuetify'

import { APIService } from '../utils/APIService'

Vue.use(Vuetify)

const apiService = new APIService()

export default ({
    name: "Comment",
    props: {
        commentContent: Array,
        width: Number,
        height: Number,
    },
    data() {
        return {

        }
    },
    methods: {
        getMoment(datetime) {
            return moment(datetime).fromNow();
        },
        loadMenu() {
            alert("menu loaded")
        },
        currentUserIsAuthor(author_id) {
            const currentUser = apiService.getCurrentUser()
            console.log('is author: ', currentUser.user_id == author_id)
            return currentUser.user_id == author_id
        }
    },
    mounted() {

    }
})
</script>
