import express from 'express'
import { deleteUser, getAllUsers, getUser, updatePassword, updateUser } from '../controllers/userController'
import { authorize } from '../middlewares/auth'

const router = express.Router()

router.put('/update/me/:id', updateUser)
router.delete('/delete/:id', deleteUser)
router.get('/all', getAllUsers)
router.get('/:id', getUser)
router.put('/update/password/:id', updatePassword)

export default router