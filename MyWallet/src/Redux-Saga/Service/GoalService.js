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


function newGoal(payload) {
    return userApiClientBase()
        .post('/v1/goal/new', payload)
        .then(response => {
            return response;
        })
        .catch(function (error) {
            return error.response;
        });
}

function getAllGoal(payload) {
    return userApiClientBase()
        .get('/v1/goal/allGoals', payload)
        .then(response => {
            return response;
        })
        .catch(function (error) {
            return error.response;
        });
}

function getOneGoal(payload) {

    return userApiClientBase()
        .get('/v1/goal/' + payload.id)
        .then(response => {
            return response;
        })
        .catch(function (error) {
            return error.response;
        });
}

function updateGoal(payload) {

    return userApiClientBase()
        .put('/v1/goal/update/' + payload.id, payload.new)
        .then(response => {
            return response;
        })
        .catch(function (error) {
            return error.response;
        });
}


export const goalService = {
    newGoal,
    getAllGoal,
    updateGoal,
    getOneGoal

};