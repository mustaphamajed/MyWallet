import { put, call } from 'redux-saga/effects';

import { goalService } from '../Service/GoalService';
import NavigationService from '../Service/NavigationService'
import GoalTypes from '../Store/Goal/Actions';
export function* newGoal(action) {
    const response = yield call(goalService.newGoal, action.payload);

    if (response.status === 200) {
        yield put(GoalTypes.newSuccess(response.data))
        NavigationService.navigateAndReset('objectif')
    } else {
        console.log(response)
    }

}


export function* fetchGoal() {
    const response = yield call(goalService.getAllGoal);
    if (response.status === 200) {
        yield put(GoalTypes.getSuccess(response.data))

    } else {
        console.log(response)
    }
}


export function* updateGoal(action) {
    const response = yield call(goalService.updateGoal, action.payload);
    if (response.status === 200) {
        //  yield put(GoalTypes.updateSuccess(response.data))

    } else {
        console.log(response)
    }
}

export function* oneGoal(action) {
    const response = yield call(goalService.getOneGoal, action.payload);
    console.log(response)
    if (response.status === 200) {
        yield put(GoalTypes.oneSuccess(response.data))

    } else {
        console.log(response)
    }
}



