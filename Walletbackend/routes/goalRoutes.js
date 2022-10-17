import express from 'express'
import { createGoal, getAllGoals, updateGoal, getGoal } from '../controllers/goalController'
import { authorize } from '../middlewares/auth'

const router = express.Router()

router.get('/allGoals', getAllGoals)
router.post('/new', createGoal)
router.put('/update/:id', updateGoal)
router.get('/:id', getGoal)


export default router