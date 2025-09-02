import { model, Schema } from "mongoose";

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    salt:{
        type:String,
        required:true 
    }
},{timestamps:true})


export const User = model('users', userSchema)
export default User