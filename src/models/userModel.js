import mongoose from "mongoose";
import { boolean, maxLength, minLength, string } from "zod";


const UserSchema = new mongoose.Schema({
    email:{
        type:string,
        required:true,
        unique: true,
        trime: true,
        minLength:6,
        maxLength:254

    },   
    password:{
    type:string,
    required:true,
    minLength:6,
    maxLength:254
    },
    username:{
        type:string,
        default:'',
        required:true,
        trim:true,
        minLength:3,
        maxLength:20
    },
    isAdmin:{
        type:boolean,
        default:false,
        required:true
    }
})

export default mongoose.model('User',UserSchema);

