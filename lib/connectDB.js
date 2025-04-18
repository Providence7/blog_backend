import mongoose from "mongoose";

const connectDB = async () =>{
    try {
       await mongoose.connect(process.env.MONGO)
       console.log("mongodb connected")
    } catch (err) {
        console.log("MongoDB Connection Error:", err)
    }
}
export default connectDB