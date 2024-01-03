import mongoose from "mongoose";

const db = mongoose.connection
mongoose.connect(process.env.MONGO_URL)
db.on('connected', ()=> {
  console.log(`MongoDB connect at ${db.name}`)
})