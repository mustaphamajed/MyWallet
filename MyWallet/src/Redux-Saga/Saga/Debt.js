import { put, call } from 'redux-saga/effects';

import { DebtService } from '../Service/DebtService';

import NavigationService from '../Service/NavigationService'
import DebtTypes from '../Store/Debt/Actions';
import Toast from 'react-native-simple-toast'

export function* newDept(action) {
    const response = yield call(DebtService.newDebt, action.payload);

    if (response.status === 200) {
        yield put(DebtTypes.setDebt(response.data))
        NavigationService.navigateAndReset('dettes')
    } else {
        Toast.show(response)
    }

}

export function* getAllDept(action) {
    const response = yield call(DebtService.getAllDebt, action.payload);

    if (response.status === 200) {
        yield put(DebtTypes.getDebt(response.data))
    } else {
        Toast.show(response)
    }


}

export function* removeDept(action) {
    const response = yield call(DebtService.removeDebt, action.payload);
    console.log(response.status)
    if (response.status === 200) {
        yield put(DebtTypes.getDebt(response.data))
        
    } else {
        Toast.show(response)
    }



}

export function* updateDept(action) {
    const response = yield call(DebtService.updateDebt, action.payload);

    if (response.status === 200) {
        yield put(DebtTypes.getDebt(response.data))
        NavigationService.back()
    } else {
        Toast.show(response)
    }
}

