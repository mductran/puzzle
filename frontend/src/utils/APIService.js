import { CookiesUtils } from './CookiesUtils'

const baseURL = 'http://localhost:8000/';
const cookiesUtils = new CookiesUtils()

export class APIService {
    constructor() {}

    parseJwt(token) {
        var base64Url = token.split('.')[1]
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        }).join(''))

        return JSON.parse(jsonPayload);
    }

    validateToken(token) {
        const accessToken = this.parseJwt(token)
        if (Date.now()/1000 <= accessToken["exp"]) {
            console.log('not expired')
            return true
        }
        else{
            console.log('expired, refreshing')
            this.post('refresh').then(
                (response) => {
                    const refreshSuccessfully = (response.status == 200)
                    console.log("refresh response", refreshSuccessfully)
                    return refreshSuccessfully
                }
            )
        }
        return false
    }

    getCurrentUser() {
        if (this.validateToken("access_token")) {
            const token = cookiesUtils.getCookie("access_token")
            const dtoken = this.parseJwt(token)
            return dtoken
        }
        else {
            return {}
        }
    }

    async getItems(endpoint, page=1) {
        const url = baseURL + endpoint + "?page=" + page
        const accessToken = cookiesUtils.getCookie("accessToken")
        const config = {
            method: 'GET',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken!=null ? accessToken : '',
            },
            redirect: "follow",
        }
        const response = await fetch(url, config)
        return {...await(response.json()), 'status': response.status}
    }
    

    async getItem(endpoint, pk) {
        const url = baseURL + endpoint + "/" + pk
        const accessToken = cookiesUtils.getCookie("accessToken")
        const config = {
            method: "GET",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken!=null ? accessToken : '',
            },
        }
        const response = await fetch(url, config)
        return {...await(response.json()), 'status': response.status}
    }

    async post(endpoint, data={}){
        const url = baseURL + endpoint
        const accessToken = cookiesUtils.getCookie("accessToken")
        const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken!=null ? accessToken : '',
            },
            redirect: "follow",
            body: JSON.stringify(data)
        })
        return {...await(response.json()), 'status': response.status}
    }
}
