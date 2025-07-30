import mongoose from "mongoose"
import { user } from "./user.model.js"

const courseSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref: user
    },
    fees:{
       type: String,
       required:true
    }
},{timestamps:true})


const course = mongoose.models("course",courseSchema)

export {course}