import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'

// ----------------- REGISTER -----------------
const register = async (req,res, next) => {
  try {
    const {name, email} = req.body
    // Validation form
    if (!name || !email || !req.body.password) {
      res.status(401)
      return next('Please, fill in all required fields')
    }
    // Send error if password < 6 characters
    if (req.body.password.length < 6) {
      res.status(401)
      return next('Password must be up to 6 characters')
    }

    // Check if user exists
    let user = await User.findOne({email})
    if (user) {
      res.status(401)
      return next('This account has already been registered')
    }

    // Hash password and create new user
    const hashPassword = bcrypt.hashSync(req.body.password, 10)
    user = await User.create({
      name,
      email,
      password: hashPassword
    })
    const {password, ...rest} = user._doc
    return res.status(201).json({success: true, message: 'Successful create the account', data: rest})
  } catch (error) {
    return next('Interval server error')
  }
}


export {register} 