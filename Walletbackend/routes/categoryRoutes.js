import express from 'express'
import {getCategory, updateCategory, deleteCategory, getAllCategories, createCategory } from '../controllers/categoryController'
import { authorize } from '../middlewares/auth'


const router = express.Router()

router.post('/', createCategory)
router.get('/all', getAllCategories)
router.get('/:id', getCategory) 
router.put('/:id', updateCategory)
router.delete('/:id', deleteCategory)

export default router
