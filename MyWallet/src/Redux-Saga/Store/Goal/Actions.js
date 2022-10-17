import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    newGoal: ['payload'],
    newSuccess: ['response'],
    getGoal: ['payload'],
    getSuccess: ['response'],
    getFailure: ['errorMessage'],
    updateGoal: ['payload'],
    updateSuccess: ['response'],
    oneGoal: ['payload'],
    oneSuccess: ['response']

});

export const GoalTypes = Types;
export default Creators;
