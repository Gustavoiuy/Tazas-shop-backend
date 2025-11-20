import mongoose from "mongoose";
import { minLength, string } from "zod";
import { required } from "zod/mini";

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    stock:{
        type:Number,
        required:true,
        min:0
    },
    imageUrl:{
        type:String,
        required:true
    }


},{timestamps:true})

export default mongoose.model('Product',ProductSchema)