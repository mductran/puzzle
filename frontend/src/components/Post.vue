<template>
    <v-card justify-center outlined class="post-card">
        <v-card-title> @{{ postContent.author_name }} </v-card-title>
        <v-card-subtitle> {{ getMoment(postContent.updated) }} </v-card-subtitle>
        <v-card-text> {{ postContent.content }} </v-card-text>
        <v-img contain :height="imageHeight" :src="postContent.image" class="post-image"></v-img>
        
        <v-card-actions>
            <v-btn text style="width: 50%;">
                React
            </v-btn>
            <v-btn text @click="reveal = !reveal" style="width: 50%;">
                Comments
            </v-btn>
        </v-card-actions>

        <v-expand-transition>
            <v-card v-if="reveal" outlined color="rgba(0,0,0,0)" class="transition-fast-in-fast-out comment-section">
                <Comment v-bind:commentContent="postContent.comments"/>
            </v-card>
        </v-expand-transition>
    </v-card>
</template>

<script>
import "vuetify/dist/vuetify.min.css"
import Comment from "../components/Comment.vue"
import moment from 'moment'

require("../assets/styles/post.css")

export default ({
    name: "Post",
    components: {
        Comment
    },
    props: {
        postContent: Object,
        imageHeight: Number,
        postWidth: Number,
    },
    data() {
        return {
            reveal: false,
        }
    },
    methods: {
        getMoment(datetime) {
            return moment(datetime).fromNow()
        }
    },
    mounted() {
    }
})
</script>

