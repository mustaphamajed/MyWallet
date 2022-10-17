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

function newBudget(payload) {
    return userApiClientBase()
        .post('/v1/budget/', payload)
        .then(response => {

            return response;
        })
        .catch(function (error) {
            return error.response;
        });
}

function getBudgets(payload1) {

    return userApiClientBase()
        .get('/v1/budget/all/' + payload1.userId)
        .then(response => {

            return response;
        })
        .catch(function (error) {
            return error;
        });
}
function getOneBudget(payload) {
    return userApiClientBase()
        .get('/v1/budget/' + payload)
        .then(response => {

            return response;
        })
        .catch(function (error) {
            return error.response;
        });
}

function removeBudget(payload) {

    return userApiClientBase()
        .delete('/v1/budget/' + payload.id, payload.user)
        .then(response => {

            return response;
        })
        .catch(function (error) {
            return error.response;
        });
}

export const BudgetService = {
    newBudget,
    getBudgets,
    getOneBudget,
    removeBudget


};