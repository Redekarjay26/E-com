import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = mongoose.connect(process.env.MONGO_URL, {})
    console.log(`mongo db connected ${(await conn).connection.host}`)
  } catch (error) {
    console.log(error)
  }
}

export default connectDB
