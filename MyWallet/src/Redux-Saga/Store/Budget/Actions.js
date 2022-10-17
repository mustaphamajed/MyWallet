import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    newBudget: ['payload'],
    addSuccess: ['response'],
    getBudgets: ['payload'],
    removeBudget: ['payload'],
    fetchOne: ['payload'],
    fetchOneSuccess: ['response'],
    fetchBudgetSuccess: ['response'],
    fetchBudgetFailure: ['errorMessage'],


});

export const BudgetTypes = Types;
export default Creators;