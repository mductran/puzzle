import axios from 'axios';


const baseURL = 'http://localhost:8000/';
export class APIService{

constructor(){
}

getItems(endPoint, page=1){
    const url = baseURL + endPoint + "?page=" + page;
    return axios.get(url).then(response => {return response.data;});
}


getItem(endPoint, pk){
    const url = baseURL + endPoint + "/" + pk;
    return axios.get(url).then(response => {return response.data;});
}

}
