import { INITIAL_STATE } from './InitialState';
import { createReducer } from 'reduxsauce';
import { CategorieTypes } from './Actions';

export const fetchSuccess = (state, { response }) => ({
    ...state,
    rows: response,
    errorMessage: null,
});

export const fetchFailure = (state, { errorMessage }) => ({
    ...state,
    rows: null,
    errorMessage: errorMessage,
});

export const reducer = createReducer(INITIAL_STATE, {
    [CategorieTypes.FETCH_SUCCESS]: fetchSuccess,
    [CategorieTypes.FETCH_FAILURE]: fetchFailure,

});
