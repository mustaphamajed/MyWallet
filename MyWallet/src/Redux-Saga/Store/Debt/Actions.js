import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    newDebt: ['payload'],
    getAll: ['payload'],
    removeDebt: ['payload'],
    updateDette: ['payload'],
    getDebt: ['response'],
    setDebt: ['response'],
    getFailed: ['errorMessage'],


});

export const DebtTypes = Types;
export default Creators;