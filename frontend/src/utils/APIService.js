import axios from 'axios';

const baseURL = 'http://localhost:8000/';

export class APIService {
    constructor(){}

    getItems(endPoint, page=1, token=null) {
        const url = baseURL + endPoint + "?page=" + page;
        if (token) {
            var config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token 
                }
            }
        }
        return axios.get(url, config).then(
            response => {
                return response.data
            }
        )
    }

    getItem(endPoint, pk, token=null) {
        const url = baseURL + endPoint + "/" + pk;
        if (token) {
            var config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token 
                }
            }
        }
        return axios.get(url, config).then(
            response => {
                return response.data
            }
        )
    }

    post(endPoint, payload) {
        const url = baseURL + endPoint

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


    parseJwt (token) {
        var base64Url = token.split('.')[1]
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        }).join(''))
    
        return JSON.parse(jsonPayload);
    }
}
