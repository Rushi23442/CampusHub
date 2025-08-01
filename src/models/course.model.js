import mongoose from "mongoose"
import { user } from "./user.model.js"

const courseSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true,
        unique:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref: user,
        required:true
    },
    fees:{
       type: String,
       required:true
       
    }
},{timestamps:true})


const course = mongoose.model("course",courseSchema)

export {course}