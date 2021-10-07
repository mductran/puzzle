<template>
 <div class="posts-container" id="posts-container">
    <v-container>
        <v-responsive class="justify-center">
            <div v-for="post in posts" :key="post.id">
                <Post v-bind:postContent="post"/>
            </div>    
        </v-responsive>

        <v-spacer></v-spacer>

        <v-pagination v-model="currentPage" :length="totalPages" :total-visible="7" color="#42A5F5" @input="handlePagination" id="pagination">
        </v-pagination>
    </v-container> 
 </div>
</template>

<script>
export default {
  name: "Puzzle",
  data() {
    return {

    };
  },
  methods: {

  },
  mounted() {

},
};
</script>
