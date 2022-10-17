import { combineReducers } from 'redux';
import configureStore from './CreateStore';
import rootSaga from '../Saga';
import { reducer as UserReducer } from './User/Reducer';
import { reducer as CategorieReducer } from './Categorie/Reducer'
import { reducer as GoalReducer } from './Goal/Reducer'
import { reducer as WalletReducer } from './Wallet/Reducer'
import { reducer as BudgetReducer } from './Budget/Reducer'
import { reducer as DebtReducer } from './Debt/Reducer'
import { reducer as PaymentReducer } from './Payment/Reducer'
import { reducer as EventReducer } from './Event/Reducer'

export default () => {
    const appReducer = combineReducers({
        user: UserReducer,
        wallet: WalletReducer,
        budget: BudgetReducer,
        debt: DebtReducer,
        payment: PaymentReducer,
        event: EventReducer,
        categorie: CategorieReducer,
        goal: GoalReducer,


    });

    const rootReducer = (state, action) => {
        return appReducer(state, action);
    };

    return configureStore(rootReducer, rootSaga);
};
