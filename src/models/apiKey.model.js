import mongoose from "mongoose"
import { user } from "./user.model.js"

const apiKeySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "user",
        required:true
    },
    apiKey:{
        type: String,
        required:true
    }
},{timestamps:true})

const apiKey = mongoose.model("apiKey",apiKeySchema)

export  {apiKey}