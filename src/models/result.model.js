import mongoose from "mongoose";
import { course } from "./course.model.js";
import { user } from "./user.model.js";

const resultSchema = new mongoose.Schema(
  {
    totalMarks: {
      type: Number,
      required: true,
    },
    percentage: {
      type: Number,
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: course,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: user,
      required: true,
    },
  },
  { timestamps: true }
);

const result = mongoose.model("result", resultSchema);

export { result };
