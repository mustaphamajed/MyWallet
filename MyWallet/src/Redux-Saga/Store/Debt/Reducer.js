import { INITIAL_STATE } from './InitialState';
import { createReducer } from 'reduxsauce';
import { DebtTypes } from './Actions';

export const getDebt = (state, { response }) => ({
    ...state,
    debts: response,
    errorMessage: null,
});
export const setDebt = (state, { response }) => ({
    ...state,
    debts: state.debts.concat(response),
    errorMessage: null,
});

export const getFailed = (state, { errorMessage }) => ({
    ...state,
    debts: null,
    errorMessage: errorMessage,
});

export const reducer = createReducer(INITIAL_STATE, {
    [DebtTypes.GET_DEBT]: getDebt,
    [DebtTypes.SET_DEBT]: setDebt,
    [DebtTypes.GET_FAILED]: getFailed,

});
