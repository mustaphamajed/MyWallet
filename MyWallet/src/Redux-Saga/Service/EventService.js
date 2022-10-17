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

function newEvent(payload) {
    return userApiClientBase()
        .post('/v1/event/', payload)
        .then(response => {

            return response;
        })
        .catch(function (error) {
            return error.response;
        });
}

function getEvents(payload1) {

    return userApiClientBase()
        .get('/v1/event/all/' + payload1.userId)
        .then(response => {

            return response;
        })
        .catch(function (error) {
            return error;
        });
}


function removeEvent(payload) {

    return userApiClientBase()
        .delete('/v1/event/' + payload.id, payload.userId)
        .then(response => {

            return response;
        })
        .catch(function (error) {
            return error.response;
        });
}

function updateEvent(payload) {

    return userApiClientBase()
        .put('/v1/event/' + payload.id, payload.event)
        .then(response => {

            return response;
        })
        .catch(function (error) {
            return error.response;
        });
}

export const EventService = {
    newEvent,
    getEvents,
    removeEvent,
    updateEvent


};