import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    register: ['payload'],
    registerSuccess: ['response'],
    registerFailure: ['errorMessage'],
    login: ['payload'],
    loginSuccess: ['response'],
    loginFailure: ['errorMessage'],
    updateUser: ['payload'],
    updateSuccess: ['payload'],
    logout: ['payload']

});

export const UserTypes = Types;
export default Creators;
