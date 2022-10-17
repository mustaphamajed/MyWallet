import express, { Router } from 'express'
import userRouter from './userRoutes'
import authRouter from './authRoutes'
import categoryRouter from './categoryRoutes'
import paymentRouter from './paymentRoutes'
import budgetRouter from './budgetRoutes'
import goalRouter from './goalRoutes'
import walletRouter from './walletRoutes'
import debtRouter from './debtRoutes'
import eventRouter from './eventRoutes'
import { verifyJWT } from '../middlewares/verifyJWT'


const appRoutes = express()


appRoutes.use('/auth/', authRouter)
appRoutes.use('/category/', categoryRouter)
appRoutes.use('/user/', userRouter)
appRoutes.use('/payment/', paymentRouter)
appRoutes.use('/budget/', budgetRouter)
appRoutes.use('/goal/', goalRouter)
appRoutes.use('/wallet/', walletRouter)
appRoutes.use('/debt/', debtRouter)
appRoutes.use('/event/', eventRouter)



export const router = Router()
router.get('/', (req, res) => {
  res.send('API is working properly')
})

appRoutes.use('/', router)

export default appRoutes