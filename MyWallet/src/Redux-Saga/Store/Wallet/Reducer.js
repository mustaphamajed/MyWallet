import { INITIAL_STATE } from './InitialState';
import { createReducer } from 'reduxsauce';
import { WalletTypes } from './Actions';


export const fetchWalletSuccess = (state, { response }) => ({
    ...state,
    wallet: response,
    errorMessage: null,
});

export const fetchWalletFailure = (state, { errorMessage }) => ({
    ...state,
    wallet: null,
    errorMessage: errorMessage,
});

export const reducer = createReducer(INITIAL_STATE, {
    [WalletTypes.FETCH_WALLET_SUCCESS]: fetchWalletSuccess,
    [WalletTypes.FETCH_WALLET_FAILURE]: fetchWalletFailure,

});