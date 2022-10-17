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

function newWallet(payload) {
    return userApiClientBase()
        .post('/v1/wallet/new', payload)
        .then(response => {
            return response;
        })
        .catch(function (error) {
            return error.response;
        });
}
function getWallet(payload) {
    return userApiClientBase()
        .get('/v1/wallet/all', payload)
        .then(response => {
            return response;
        })
        .catch(function (error) {
            return error.response;
        });
}

export const walletService = {
    newWallet,
    getWallet


};