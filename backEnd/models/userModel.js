import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true ,unique: true},
  password: {type: String, required: true},
  photo: {
    type: String,
    default: 'https://i.ibb.co/4pDNDk1/avatar.png'
  },
  phone: {type: String},
  bio: {
    type: String,
    default: 'bio'
  }
}, {
  timestamps: true
})
// Encrypt password before saving 
userSchema.pre('save', async function(next){
  if (!this.isModified('password')) return next()
  // hash password
  this.password = bcrypt.hashSync(this.password, 10)  
})

const User = mongoose.model('User', userSchema)
export default User