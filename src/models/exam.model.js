import mongoose from "mongoose"
import { result } from "./result.model.js"

const examSchema = new mongoose.Schema({
    examName:{
        type:String,
        required:true,
        unique:true
    },
    // resultId:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"result",
    //     required:true
    // }

},{timestamps:true})

const exam = mongoose.model("exam",examSchema)

export {exam}