import { INITIAL_STATE } from './InitialState';
import { createReducer } from 'reduxsauce';
import { UserTypes } from './Actions';

export const registerSuccess = (state, { response }) => ({
    ...state,
    user: response,
    error: null

});
export const registerFailure = (state, { errorMessage }) => ({
    ...state,
    user: null,
    error: errorMessage,
});

export const loginSuccess = (state, { response }) => ({
    ...state,
    user: response,
    error: null,
});

export const loginFailure = (state, { errorMessage }) => ({
    ...state,
    user: null,
    error: errorMessage,
});

export const updateSuccess = (state, { errorMessage }) => ({
    ...state,
    user: null,
    error: errorMessage,
});

export const logout = (state, { errorMessage }) => ({
    ...state,
    user: null,
    error: null,
});




export const reducer = createReducer(INITIAL_STATE, {
    [UserTypes.REGISTER_SUCCESS]: registerSuccess,
    [UserTypes.REGISTER_FAILURE]: registerFailure,
    [UserTypes.LOGIN_SUCCESS]: loginSuccess,
    [UserTypes.UPDATE_SUCCESS]: updateSuccess,
    [UserTypes.LOGIN_FAILURE]: loginFailure,
    [UserTypes.LOGOUT]: logout


});
