import expres from "express"
import { register, login } from "../controllers/autController"
const router = expres()

router.post('/register', register)
router.post('/login', login)


export default router