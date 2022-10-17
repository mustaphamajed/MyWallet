import mongoose, { Schema } from 'mongoose'

const budgetSchema = Schema({

  userId: {
    type: Schema.ObjectId,
    ref: "User"
  },
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true // Pour supprimer les caractères invisibles commes les espaces, etc...
  },
  incomes: [{
    amount: { type: Number },
    name: { type: String },
  }],
  expenses: [{
    amount: { type: Number },
    name: { type: String },
  }],

  initialBudget: Number,
  finalBudget: Number,
  startDate: String,
  endDate: String


}, { timestamps: true })


export default module = mongoose.model('Budget', budgetSchema)
