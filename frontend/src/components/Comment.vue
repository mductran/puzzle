<template>
    <div>
        <div v-for="comment in commentContent" :key="comment.id" class="comment-card">
            <p> @{{ comment.author_name}} </p>
            <p> {{ getMoment(comment.updated) }} </p>
            <p> {{ comment.content }} </p>
        </div>
    </div>
</template>

<script>
import "vuetify/dist/vuetify.min.css"
import moment from 'moment'

require("../assets/styles/comment.css")

export default ({
    name: "Comment",
    components: {},
    props: {
        commentContent: Array,
        width: Number,
        height: Number,
    },
    data() {
        return {
            comment: {}
        }
    },
    methods: {
        getMoment(datetime) {
            return moment(datetime).fromNow();
        }
    },
    mounted() {

    }
})
</script>
