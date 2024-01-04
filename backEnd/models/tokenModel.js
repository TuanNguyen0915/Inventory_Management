import mongoose, { Schema } from "mongoose"

const tokenSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId, ref: "User", required: true
  },
  token: {
    type: String, required: true
  },
  createAt: {
    type: Date, required: true
  },
  expiresAt: {
    type: Date, required: true
  }
})

const Token = mongoose.model('Token', tokenSchema)

export default Token