<template>
    <v-card justify-center outlined class="puzzle-card">
        <v-img 
            contain 
            :height="imageHeight" 
            :src="item.image"
            class="puzzle-image"/>
        <v-card-title> {{ item.name }} </v-card-title>
        <v-divider/>
    </v-card>
</template>

<style>
@import "../assets/styles/puzzle.css";
</style>

<script>
export default {
    name: "Puzzle",
    props: {
        item: Object
    }
}

</script>
