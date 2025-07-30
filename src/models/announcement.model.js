import mongoose from "mongoose"
import { user } from "./user.model.js"

const announcementSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true,
    },
    message: {
        type:String,
        required:true,
    },
    createdBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref:user
    }
},{timestamps:true})

const announcement = mongoose.model("announcement",announcementSchema)

export {announcement}