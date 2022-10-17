import { takeLatest, all } from 'redux-saga/effects';
import { UserTypes } from '../Store/User/Actions';
import { CategorieTypes } from '../Store/Categorie/Actions';
import { GoalTypes } from '../Store/Goal/Actions';
import { WalletTypes } from '../Store/Wallet/Actions';
import { register, login, update, logout } from './User';
import { newCategorie, fetch ,updateCategorie} from './Categorie'
import { newGoal, fetchGoal, updateGoal, oneGoal } from './Goal'
import { newWallet, getWallet } from './Wallet'
import { newBudget, getBudgets, getOneBudget, removeBudget } from './Budget'
import { BudgetTypes } from '../Store/Budget/Actions';
import { newDept, getAllDept, removeDept ,updateDept} from './Debt';
import { DebtTypes } from '../Store/Debt/Actions';
import { getAllPayment, newPayment, removePayment } from './Payment'
import { PaymentTypes } from '../Store/Payment/Actions'
import { EventTypes } from '../Store/Event/Actions';
import { getEvents, newEvent, removeEvent,updateEvent } from './Event'

export default function* root() {
    yield all([
        takeLatest(UserTypes.REGISTER, register),
        takeLatest(UserTypes.LOGIN, login),
        takeLatest(UserTypes.UPDATE_USER, update),
        takeLatest(UserTypes.LOGOUT, logout),

        takeLatest(CategorieTypes.NEW_CATEGORIE, newCategorie),
        takeLatest(CategorieTypes.FETCH, fetch),
        takeLatest(CategorieTypes.UPDATE_CATEGORIE, updateCategorie),

        takeLatest(GoalTypes.NEW_GOAL, newGoal),
        takeLatest(GoalTypes.ONE_GOAL, oneGoal),
        takeLatest(GoalTypes.GET_GOAL, fetchGoal),
        takeLatest(GoalTypes.UPDATE_GOAL, updateGoal),

        takeLatest(EventTypes.GET_EVENT, getEvents),
        takeLatest(EventTypes.NEW_EVENT, newEvent),
        takeLatest(EventTypes.REMOVE_EVENT, removeEvent),
        takeLatest(EventTypes.UPDATE_EVENT, updateEvent),

        takeLatest(WalletTypes.NEW_WALLET, newWallet),
        takeLatest(WalletTypes.GET_WALLET, getWallet),

        takeLatest(BudgetTypes.NEW_BUDGET, newBudget),
        takeLatest(BudgetTypes.GET_BUDGETS, getBudgets),
        takeLatest(BudgetTypes.REMOVE_BUDGET, removeBudget),

        takeLatest(PaymentTypes.REMOVE_PAYMENT, removePayment),

        takeLatest(DebtTypes.NEW_DEBT, newDept),
        takeLatest(DebtTypes.GET_ALL, getAllDept),
        takeLatest(DebtTypes.REMOVE_DEBT, removeDept),
        takeLatest(DebtTypes.UPDATE_DETTE, updateDept),


        takeLatest(PaymentTypes.NEW_PAYMENT, newPayment),
        takeLatest(PaymentTypes.GET_PAYMENT, getAllPayment),
        takeLatest(BudgetTypes.FETCH_ONE, getOneBudget),

    ]);
}
