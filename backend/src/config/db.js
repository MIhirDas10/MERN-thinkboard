import mongoose from "mongoose"

export const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected sucessfully!")
    } catch(error) {
        console.error("An error happend", error)
        process.exit(1) // exit with failure
    }
}