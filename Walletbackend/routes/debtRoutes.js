import express from 'express'
import { createDebt, getAllDebts, deleteDebt,updateDebt } from '../controllers/debtController'
import { authorize } from '../middlewares/auth'

const router = express.Router()

router.post('/new', createDebt)
router.get('/All/:budgetId', getAllDebts)
router.delete('/delete/:id', deleteDebt)
router.put('/update/:id', updateDebt)


export default router