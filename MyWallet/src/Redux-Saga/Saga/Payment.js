import { put, call } from 'redux-saga/effects';
import PaymentTypes from '../Store/Payment/Actions';
import { PaymentService } from '../Service/PaymentService';
import Toast from 'react-native-simple-toast'
import NavigationService from '../Service/NavigationService'

export function* newPayment(action) {
    const response = yield call(PaymentService.newPayment, action.payload);
    console.log(response)
    if (response.status === 200) {
        yield put(PaymentTypes.setPayment(response.data))
        console.log(response.data)
    } else {
        Toast.show(response.data.msg)
    }


}

export function* getAllPayment(action) {
    const response = yield call(PaymentService.getAllPayment, action.payload);
    if (response.status === 200) {
        yield put(PaymentTypes.paymentSuccess(response.data))
    } else {
        Toast.show('err')
    }

}

export function* removePayment(action) {
    const response = yield call(PaymentService.removePayment, action.payload);

    if (response.status === 200) {
        yield put(PaymentTypes.paymentSuccess(response.data))
    } else {
        Toast.show(response)
    }
}