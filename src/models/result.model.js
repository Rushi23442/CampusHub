import mongoose from "mongoose";
import { course } from "./course.model.js";
import { user } from "./user.model.js";
import { exam } from "./exam.model.js";

const resultSchema = new mongoose.Schema(
  {
    totalMarks: {
      type: String,
      required: true,
    },
    percentage: {
      type: String,
      required: true,
    },
    exam:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"exam",
      required:true
    },
    
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const result = mongoose.model("result", resultSchema);

export { result };
