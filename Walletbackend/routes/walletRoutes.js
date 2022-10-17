import express from 'express'
import { createWallet, deleteWallet, getAllWallets, getWallet, updateWallet } from '../controllers/walletController'
import { authorize } from '../middlewares/auth'

const router = express.Router()

router.post('/new', createWallet)
router.get('/all', getAllWallets)
router.get('/', getWallet)
router.put('/:id', updateWallet)
router.delete('/:id', deleteWallet)

export default router