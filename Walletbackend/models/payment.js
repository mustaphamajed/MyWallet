import mongoose, { Schema } from 'mongoose'

const paymentSchema = Schema({
  name: {
    type: String,
    // required: true,
    trim: true // Pour supprimer les caractères invisibles commes les espaces, etc...
  },
  category: {
    type: Schema.ObjectId,
    ref: 'Category'
  },
  budget: {
    type: Schema.ObjectId,
    ref: 'Budget'
  },
  type: {
    type: String,

  },
  amount: Number,
  paymentMethod: String




}, { timestamps: true })


export default module = mongoose.model('Payment', paymentSchema)
