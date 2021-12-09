<template>
    <div>
        <div v-for="comment in commentContent" :key="'comment_'+comment.id" class="comment-card">
            <div class="comment-title">
                <p style="font-weight: bold;"> @{{ comment.author_name}} </p>
                <v-icon v-if="currentUserIsAuthor(comment.author_id)" @click.prevent="loadMenu">
                    mdi-dots-vertical
                </v-icon>
            </div>
            <p class="comment-subdetails"> {{ getMoment(comment.updated) }} </p>
            <p> {{ comment.content }} </p>
        </div>
    </div>
</template>

<style>
@import "../assets/styles/comment.css";
</style>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

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
    computed: {
        ...mapGetters({
            myCurrentUser: "users/getCurrentUser"
        })
    },
    methods: {
        getMoment(datetime) {
            return moment(datetime).fromNow();
        },
        loadMenu() {
            alert("menu loaded")
        },
        currentUserIsAuthor(author_id) {
            return this.myCurrentUser.id == author_id
        }
    },
})
</script>
