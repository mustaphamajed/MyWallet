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

function newPayment(payload) {
    return userApiClientBase()
        .post('/v1/payment/', payload)
        .then(response => {
            return response;
        })
        .catch(function (error) {
            return error.response;
        });
}

function getAllPayment(payload) {
    return userApiClientBase()
        .get('/v1/payment/all/' + payload)
        .then(response => {

            return response;
        })
        .catch(function (error) {
            return error.response;
        });
}

function removePayment(payload) {
    return userApiClientBase()
        .delete('/v1/payment/' + payload.id, payload.budget)
        .then(response => {

            return response;
        })
        .catch(function (error) {
            return error.response;
        });
}

export const PaymentService = {
    newPayment,
    getAllPayment,
    removePayment


};