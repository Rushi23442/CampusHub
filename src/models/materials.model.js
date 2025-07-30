import mongoose from "mongoose";
import { user } from "./user.model.js";
import { course } from "./course.model.js";

const materialSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:user,
    required:true
  },
  course:{
    type: mongoose.Schema.Types.ObjectId,
    ref:course,
    required:true
  },
  title:{
   type:String,
   required:true,
   trim:true
  },
  description:{
    type: String,
    trim:true,
    required:true
  }

});

const material = mongoose.model("material",materialSchema)

export {material}