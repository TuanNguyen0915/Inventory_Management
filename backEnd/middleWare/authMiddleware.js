import User from "../models/userModel.js"
import jwt from 'jsonwebtoken'

const checkAuth = async (req,res, next) => {
  try {
    // check is token exists
    const token = req.cookies.token || req.body.token
    if (!token) {
      res.status(401)
      return next('Not authorized, please login')
    }
    // verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    // get user id from token
    let user = await User.findById(verified.id).select("-password")
    if (!user) {
      res.status(401)
      return next('User not found')
    }
      req.user = user
      next()
  } catch (error) {
    res.status(500)
    return next(error.message)
  }
}

export {checkAuth}