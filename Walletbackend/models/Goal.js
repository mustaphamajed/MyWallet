import mongoose, { Schema } from 'mongoose'

const GoalSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  MontantCible: Number,
  Enregistre: Number,
  date: String,
  icon: String,
  color: String,
  note: String,
}, { timestamps: true });

export default module = mongoose.model("Goal", GoalSchema);