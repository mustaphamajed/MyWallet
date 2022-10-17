import { INITIAL_STATE } from './InitialState';
import { createReducer } from 'reduxsauce';
import { BudgetTypes } from './Actions';

export const fetchBudgetSuccess = (state, { response }) => ({
    ...state,
    budgets: response,
    errorMessage: null,
});
export const fetchOneSuccess = (state, { response }) => ({
    ...state,
    budget: response,
    errorMessage: null,
});

export const addSuccess = (state, { response }) => ({
    ...state,
    budgets: state.budgets.concat(response),
    errorMessage: null,
});

export const fetchBudgetFailure = (state, { errorMessage }) => ({
    ...state,
    budgets: null,
    errorMessage: errorMessage,
});

export const reducer = createReducer(INITIAL_STATE, {
    [BudgetTypes.FETCH_BUDGET_SUCCESS]: fetchBudgetSuccess,
    [BudgetTypes.FETCH_BUDGET_FAILURE]: fetchBudgetFailure,
    [BudgetTypes.FETCH_ONE_SUCCESS]: fetchOneSuccess,
    [BudgetTypes.ADD_SUCCESS]: addSuccess,


});
