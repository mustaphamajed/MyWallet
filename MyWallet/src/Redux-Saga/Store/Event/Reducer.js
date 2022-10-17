import { INITIAL_STATE } from './InitialState';
import { createReducer } from 'reduxsauce';
import { EventTypes } from './Actions';

export const eventSuccess = (state, { response }) => ({
    ...state,
    events: response,
    errorMessage: null,
});


export const evSuccess = (state, { response }) => ({
    ...state,
    events: state.events.concat(response),
    errorMessage: null,
});

export const eventFailure = (state, { errorMessage }) => ({
    ...state,
    events: null,
    errorMessage: errorMessage,
});

export const reducer = createReducer(INITIAL_STATE, {
    [EventTypes.EVENT_SUCCESS]: eventSuccess,
    [EventTypes.EVENT_FAILURE]: eventFailure,
    [EventTypes.EV_SUCCESS]: evSuccess,


});
