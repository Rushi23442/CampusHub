import mongoose from "mongoose"
import { user } from "./user.model.js"

const apiKeySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : user
    },
    apiKey:{
        type: String
    }
},{timestamps:true})

const apiKey = mongoose.model("apiKey",apiKeySchema)

export default apiKey