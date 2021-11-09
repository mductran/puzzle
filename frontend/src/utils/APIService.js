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
            return true
        }
        else{
            this.post('refresh').then(
                (response) => {
                    const refreshSuccessfully = (response.status == 200)
                    return refreshSuccessfully
                }
            )
        }
        return false
    }

    getCurrentUser() {
        const accessToken = cookiesUtils.getCookie("access_token")
        if (accessToken){
            if (this.validateToken(accessToken)) {
                const dtoken = this.parseJwt(accessToken)
                return dtoken.user_id
            }
        }
        else {
            return {}
        }
    }

    async getItems(endpoint, page=1) {
        const url = baseURL + endpoint + "?page=" + page
        const accessToken = cookiesUtils.getCookie("access_token")
        const config = {
            method: 'GET',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken!=null ? 'Bearer ' + accessToken : '',
            },
            redirect: "follow",
        }
        const response = await fetch(url, config)
        return {...await(response.json()), 'status': response.status}
    }
    

    async getItem(endpoint, pk) {
        const url = baseURL + endpoint + "/" + pk
        const accessToken = cookiesUtils.getCookie("access_token")
        const config = {
            method: "GET",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken!=null ? 'Bearer ' + accessToken : '',
            },
        }
        const response = await fetch(url, config)
        return {...await(response.json()), 'status': response.status}
    }

    async post(endpoint, data={}){
        const url = baseURL + endpoint
        const accessToken = cookiesUtils.getCookie("access_token")
        const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken!=null ? 'Bearer ' + accessToken : '',
            },
            redirect: "follow",
            body: JSON.stringify(data)
        })
        return {...await(response.json()), 'status': response.status}
    }
}
