import axios from 'axios';
import { Config } from '../Config';

const userApiClientBase = () =>
    axios.create({
        baseURL: Config.BASE_URL,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        timeout: 3000,
    });


function newCategorie(payload) {
    return userApiClientBase()
        .post('/v1/category', payload)
        .then(response => {
            return response;
        })
        .catch(function (error) {
            return error.response;
        });
}

function getAll() {
    return userApiClientBase()
        .get('/v1/category/all')
        .then(response => {
            return response;
        })
        .catch(function (error) {
            return error.response;
        });
}

function updateCat(payload) {
    return userApiClientBase()
        .put('/v1/category/'+payload.id,payload.cat)
        .then(response => {
            return response;
        })
        .catch(function (error) {
            return error.response;
        });
}


export const categorieService = {
    newCategorie,
    getAll,
    updateCat

};