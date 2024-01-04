import User from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

// -------------- GENERATE TOKEN --------------
const generateToken = (id) => {
  return jwt.sign({id},process.env.JWT_SECRET, {expiresIn:'2d'})
}

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

    // Hash password at userModel
    // const hashPassword = bcrypt.hashSync(req.body.password, 10)
    user = await User.create({
      name,
      email,
      password: req.body.password
    })

    const token = generateToken(user._id)
    const {password, ...rest} = user._doc
    // send http-only cookie
    res.cookie('token', token, {
      path: '/',
      httpOnly: true,
      expires: new Date(Date.now() + 1000*60*60*24*2), // 2 days expires
      sameSite: 'none',
      secure: true 
    })
    return res.status(201).json({success: true, message: 'Successful create the account', data: rest, token})
  } catch (error) {
    res.status(500)
    return next(error.message)
  }
}

// ----------------- LOGIN -----------------

const login = async (req,res,next) => {
  try {
    let user = await User.findOne({email: req.body.email})
    // check email
    if (!user) {
      res.status(401)
      return next('This account does not register')
    }
    // check password
    const isPasswordMatching = bcrypt.compareSync(req.body.password, user.password)
    if(!isPasswordMatching) {
      res.status(400)
      return next('Password is not matching')
    }
    //create token and send to cookie
    const token = generateToken(user._id)
    res.cookie('token', token, {
      path: '/',
      httpOnly: true,
      expires : new Date(Date.now() + 1000*60*60*24*2),
      sameSite: 'none',
      secure: true
    })
    const {password, ...rest} = user._doc
    return res.status(200).json({success: true, message:'Login successful', data: rest, token})
  } catch (error) {
    res.status(500)
    return next(error.message)
  }
}

export {register, login} 