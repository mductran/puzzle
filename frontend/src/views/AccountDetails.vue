<template>
    <div>
        <p v-for="info in account_info" v-bind:key="info"> {{ info }} </p>
    </div>
</template>

<script>
import { APIService } from "../utils/APIService"

const apiService = new APIService()

export default {
    data() {
        return {
            account_info: {}
        }
    },
    methods: {
        getCurrentUser() {
            apiService.getItem('accounts', apiService.getCurrentUser()).then(
                (response) => {
                    this.account_info = response
                }
            )
        }
    },
    mounted() {
        this.getCurrentUser()
    }
}
</script>
