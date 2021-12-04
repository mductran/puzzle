<template>
    <div>
        <div class="puzzle-grid-container">
            <div v-for="item in items" :key="'item_'+item.id">
                <Puzzle v-bind:item="item"/>
            </div>
        </div>

        <v-pagination 
            v-model="currentPage" 
            :length="totalPages" 
            :total-visible="7" 
            color="#42A5F5" 
            @input="handlePagination" 
            id="pagination"/>
    </div>
</template>

<style scoped>
@import "../assets/styles/items.css";
</style>

<script>
import { APIService } from '../utils/APIService'
import Puzzle from '../components/Puzzle.vue'

const apiService = new APIService()

export default {
    name: "Items",
    components: {
        Puzzle,
    },
    data() {
        return {
            items: {},
            numberOfItems: 0,
            totalPages: 0,
            currentPage: 1,
            draggable: false,
            resizeable: false,
        }
    },
    methods: {
        getItems() {
            apiService.getItems('puzzles', this.currentPage).then(
                (response) => {
                    this.numberOfItems = response.results.length
                    this.totalPages = response.total_pages
                    this.items = response.results
                }
            )
        },
        onResize() {
            this.windowSize = { x: window.innerWidth, y: window.innerHeight }
            this.postHeight = 0.4*this.windowSize.innerHeight
            this.imageHeight = 0.3*this.windowSize.innerHeight
        },
        handlePagination(value) {
            this.currentPage = value
            this.getItems()
            window.scrollTo({top: 0, behavior: "smooth"})
        }
    },
    mounted() {
        this.onResize()
        this.getItems()
    }
}
</script>