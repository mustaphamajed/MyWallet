import { put, call } from 'redux-saga/effects';
import WalletTypes from '../Store/Wallet/Actions';
import { walletService } from '../Service/WalletService';
import Toast from 'react-native-simple-toast'
import NavigationService from '../Service/NavigationService'

export function* newWallet(action) {
    const response = yield call(walletService.newWallet, action.payload);

    if (response.status === 200) {
        yield put(WalletTypes.fetchWalletSuccess(response.data))
        NavigationService.navigateAndReset('Drawer')
    } else {

        Toast.show(response.data.msg)
    }


}

export function* getWallet(action) {
    const response = yield call(walletService.getWallet, action.payload);

    if (response.status === 200) {
        yield put(WalletTypes.fetchWalletSuccess(response.data))

    } else {

        Toast.show(response.data.msg)
    }


}