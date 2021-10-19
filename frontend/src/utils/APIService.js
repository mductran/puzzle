import axios from 'axios';

const baseURL = 'http://localhost:8000/';

export class APIService {
    constructor(){}

    getItems(endPoint, page=1) {
        const url = baseURL + endPoint + "?page=" + page;
        
        return axios.get(url).then(
            response => {
                return response.data
            }
        )
    }

    getItem(endPoint, pk) {
        const url = baseURL + endPoint + "/" + pk;

        return axios.get(url).then(
            response => {
                return response.data
            }
        )
    }

    post(endPoint, payload) {
        const url = baseURL + endPoint
		let config = {
			withCredentials: true,
			credentials: 'include'
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


    parseJwt (token) {
        var base64Url = token.split('.')[1]
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        }).join(''))
    
        return JSON.parse(jsonPayload);
    }
}
