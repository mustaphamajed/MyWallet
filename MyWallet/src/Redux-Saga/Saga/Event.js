import { put, call } from 'redux-saga/effects';
import EventTypes from '../../Redux-Saga/Store/Event/Actions'
import { EventService } from '../Service/EventService';
import Toast from 'react-native-simple-toast'
import NavigationService from '../Service/NavigationService'

export function* newEvent(action) {
    const response = yield call(EventService.newEvent, action.payload);

    console.log(response)
    if (response.status === 200) {
        yield put(EventTypes.evSuccess(response.data))
    } else {
        Toast.show(response)
    }

}

export function* getEvents(action) {
    const response = yield call(EventService.getEvents, action.payload);

    if (response.status === 200) {
        yield put(EventTypes.eventSuccess(response.data))

    } else {
        Toast.show(response)
    }

}



export function* removeEvent(action) {
    const response = yield call(EventService.removeEvent, action.payload);
    console.log(response)
    if (response.status === 200) {
        yield put(EventTypes.eventSuccess(response.data))

    } else {
        Toast.show(response)
    }
}

export function* updateEvent(action) {
    const response = yield call(EventService.updateEvent, action.payload);
 
    if (response.status === 200) {
        yield put(EventTypes.eventSuccess(response.data))

    } else {
        Toast.show(response)
    }
}