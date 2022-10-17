import mongoose, { Schema } from 'mongoose'

const walletSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true // Pour supprimer les caractères invisibles commes les espaces, etc...
  },
  initialBalance: {
    type: Number,
    default: 0
  },

  userId: {
    type: Schema.ObjectId ,
    ref: "User"
  }


}, { timestamps: true })


export default module = mongoose.model('Wallet', walletSchema)
