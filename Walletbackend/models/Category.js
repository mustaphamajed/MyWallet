import mongoose, { Schema } from 'mongoose'

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  IconName: {
    type: String,
    required: true, 
  },
  color: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default module = mongoose.model("Category", categorySchema);