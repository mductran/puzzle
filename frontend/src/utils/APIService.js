import axios from 'axios';

const baseURL = 'http://localhost:8000/';

export class APIService {
    constructor(){}

    getItems(endPoint, page=1, accessToken="") {
        const url = baseURL + endPoint + "?page=" + page;

        if (accessToken){
            const config = {
                headers: {
                    "Authorization": "Bearer " + accessToken,
                }
            }
            return axios.get(url, config).then(
                response => {
                    return response.data
                }
            )
        }

        return axios.get(url).then(
            response => {
                return response.data
            }
        )
    }

    getItem(endPoint, pk, accessToken="") {
        const url = baseURL + endPoint + "/" + pk;

        if (accessToken){
            const config = {
                headers: {
                    "Authorization": "Bearer " + accessToken,
                }
            }
            return axios.get(url, config).then(
                response => {
                    return response.data
                }
            )
        }        

        return axios.get(url).then(
            response => {
                return response.data
            }
        )
    }

    post(endPoint, payload, token="") {
        const url = baseURL + endPoint

        if (token) {
            const config = {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
            return axios.post(url, payload, config).then(
                response => {
                    return response
            }
            ).catch (
                error => {
                    return error.response
                }
            )
        }

        return axios.post(url, payload).then(
            response => {
                return response
        }
        ).catch (
            error => {
                return error.response
            }
        )
    }

    refresh() {
        const url = baseURL + "refresh"
        const config = {
            withCredentials: true,
        }
        return axios.post(url, config)
    }

    parseJwt (token) {
        var base64Url = token.split('.')[1]
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        }).join(''))

        return JSON.parse(jsonPayload);
    }
}
