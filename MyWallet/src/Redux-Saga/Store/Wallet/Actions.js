import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    newWallet: ['payload'],
    fetchWallet: ['payload'],
    getWallet: ['payload'],
    fetchWalletSuccess: ['response'],
    fetchWalletFailure: ['errorMessage'],



});

export const WalletTypes = Types;
export default Creators;