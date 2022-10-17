import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    newCategorie: ['payload'],
    fetch: ['payload'],
    fetchSuccess: ['response'],
    fetchFailure: ['errorMessage'],
    updateCategorie:['payload']

});

export const CategorieTypes = Types;
export default Creators;
