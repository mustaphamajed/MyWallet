import { INITIAL_STATE } from './InitialState';
import { createReducer } from 'reduxsauce';
import { PaymentTypes } from './Actions';

export const paymentSuccess = (state, { response }) => ({
    ...state,
    payments: response,
    errorMessage: null,
});

export const setPayment = (state, { response }) => ({
    ...state,
    payments: state.payments.concat(response),
    errorMessage: null,
});

export const paymentFailure = (state, { errorMessage }) => ({
    ...state,
    payments: null,
    errorMessage: errorMessage,
});

export const reducer = createReducer(INITIAL_STATE, {
    [PaymentTypes.PAYMENT_SUCCESS]: paymentSuccess,
    [PaymentTypes.SET_PAYMENT]: setPayment,
    [PaymentTypes.PAYMENT_FAILURE]: paymentFailure,

});