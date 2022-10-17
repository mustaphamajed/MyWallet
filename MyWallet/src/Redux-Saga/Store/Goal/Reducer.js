import { INITIAL_STATE } from './InitialState';
import { createReducer } from 'reduxsauce';
import { GoalTypes } from './Actions';

export const getSuccess = (state, { response }) => ({
    ...state,
    goals: response,
    errorMessage: null,
});

export const newSuccess = (state, { response }) => ({
    ...state,
    goals: state.goals.concat(response),
    errorMessage: null,
});

export const getFailure = (state, { errorMessage }) => ({
    ...state,
    goals: null,
    errorMessage: errorMessage,
});

export const updateSuccess = (state, { response }) => ({
    ...state,
    goals: response
})

export const oneSuccess = (state, { response }) => ({
    ...state,
    goal: response
})

export const reducer = createReducer(INITIAL_STATE, {
    [GoalTypes.GET_SUCCESS]: getSuccess,
    [GoalTypes.NEW_SUCCESS]: newSuccess,
    [GoalTypes.ONE_SUCCESS]: oneSuccess,
    [GoalTypes.GET_FAILURE]: getFailure,
    [GoalTypes.UPDATE_SUCCESS]: updateSuccess,

});