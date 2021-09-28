import axios from 'axios';


const baseURL = 'http://localhost:8000/';
export class APIService{

constructor(){
}

getItems(endPoint){
    const url = baseURL + endPoint;
    return axios.get(url).then(response => {return response.data;});
}


getItem(endPoint, pk){
    const url = baseURL + endPoint + "/" + pk;
    return axios.get(url).then(response => {return response.data;});
}

}
