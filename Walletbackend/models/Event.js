import mongoose, { Schema } from 'mongoose'

const eventSchema = Schema({

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

  Date: String,



}, { timestamps: true })


export default module = mongoose.model('Event', eventSchema)
