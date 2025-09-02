import mongoose, { mongo } from "mongoose";

export const connectMongoDB = async (connectionURL) =>{
    const connection = await mongoose.connect(connectionURL)
    return connection
}