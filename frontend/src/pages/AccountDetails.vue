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
            const accessToken = cookieUtils.getCookie("accessToken")
            const userId = apiService.parseJwt(accessToken)['user_id']

            apiService.getItem('accounts', userId, accessToken).then(
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
