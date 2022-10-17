import express from 'express'
import { getBudget, deleteBudget, createBudget, getAllBudgets, addExpensesOrIncomes } from '../controllers/BudgetController'
import { authorize } from '../middlewares/auth'


const router = express.Router()

router.post('/', createBudget)
router.get('/all/:userId', getAllBudgets)
router.get('/:id', getBudget)
router.delete('/:id', deleteBudget)
router.put('/expenes/incomes/:budgetId', addExpensesOrIncomes)

export default router
