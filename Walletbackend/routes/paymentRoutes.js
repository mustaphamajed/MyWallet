import express from 'express'
import { getPayment, updatePayment, deletePayment, createPayment, getAllPayments } from '../controllers/PaymentController'
import { authorize } from '../middlewares/auth'


const router = express.Router()

router.post('/', createPayment)
router.get('/all/:budgetId', getAllPayments)
router.get('/:id', getPayment)
router.put('/:id', updatePayment)
router.delete('/:id', deletePayment)

export default router
