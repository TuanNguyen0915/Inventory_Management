import User from "../models/userModel.js";

// ----------------- REGISTER -----------------
const register = async (req,res) => {
  res.status(200).json({success: true, message: 'Successful to create the account'})
}


export {register}