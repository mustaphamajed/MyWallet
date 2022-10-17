import mongoose, { Schema } from 'mongoose'
import { debtType } from './Enum'
const debtSchema = Schema({
  name: {
    type: String,
    // required: true,
    trim: true // Pour supprimer les caractères invisibles commes les espaces, etc...
  },
  description: String,

  budget: {
    type: Schema.ObjectId,
    ref: 'Budget'
  },

  type: {
    type: String,

  },
  amount: Number,
  date: String,
  dueDate: String




}, { timestamps: true })


export default module = mongoose.model('Debt', debtSchema)
