import { put, call } from 'redux-saga/effects';
import BudgetTypes from '../Store/Budget/Actions';
import { BudgetService } from '../Service/BudgetService';
import Toast from 'react-native-simple-toast'
import NavigationService from '../Service/NavigationService'

export function* newBudget(action) {
    const response = yield call(BudgetService.newBudget, action.payload);

    if (response.status === 200) {
        yield put(BudgetTypes.addSuccess(response.data))
        NavigationService.navigateAndReset('Drawer')
    } else {
        Toast.show(response)
    }

}

export function* getBudgets(action) {
    const response = yield call(BudgetService.getBudgets, action.payload);

    if (response.status === 200) {
        yield put(BudgetTypes.fetchBudgetSuccess(response.data))

    } else {
        Toast.show(response)
    }

}

export function* getOneBudget(action) {
    const response = yield call(BudgetService.getOneBudget, action.payload);

    if (response.status === 200) {
        yield put(BudgetTypes.fetchOneSuccess(response.data))

    } else {
        Toast.show(response)
    }

}

export function* removeBudget(action) {
    const response = yield call(BudgetService.removeBudget, action.payload);

    if (response.status === 200) {
        yield put(BudgetTypes.fetchBudgetSuccess(response.data))
        NavigationService.back()
    } else {
        Toast.show(response)
    }
}

