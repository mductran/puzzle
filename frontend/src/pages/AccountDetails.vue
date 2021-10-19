<template>
    <div>
        <p v-for="info in account_info" v-bind:key="info"> {{ info }} </p>
    </div>
</template>

<script>
import { APIService } from "../utils/APIService"
import { CookiesUtils } from "../utils/CookiesUtils"

const apiService = new APIService()
const cookieUtils = new CookiesUtils()

export default {
    data() {
        return {
            account_info: {}
        }
    },
    methods: {
        getCurrentUser() {
            let access = apiService.parseJwt(cookieUtils.getCookie("access"))
            apiService.getItem('accounts', access['user_id']).then(
                (response) => {
                    this.account_info = response
                    console.log(this.account_info)
                }
            )
        }
    },
    mounted() {
        this.getCurrentUser()
    }
}
</script>
