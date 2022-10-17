import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    newPayment: ['payload'],
    setPayment: ['response'],
    removePayment: ['payload'],
    getPayment: ['payload'],
    paymentSuccess: ['response'],
    paymentFailure: ['errorMessage'],


});

export const PaymentTypes = Types;
export default Creators;