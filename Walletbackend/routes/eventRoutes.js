import express from 'express'
import { getEvent, updateEvent, deleteEvent, getAllEvents, createEvent } from '../controllers/EventController'
import { authorize } from '../middlewares/auth'


const router = express.Router()

router.post('/', createEvent)
router.get('/all/:userId', getAllEvents)
router.get('/:id', getEvent)
router.put('/:id', updateEvent)
router.delete('/:id', deleteEvent)

export default router
