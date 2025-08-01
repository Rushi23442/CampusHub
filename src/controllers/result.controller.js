import { result } from "../models/result.model.js";
import { exam } from "../models/exam.model.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiResponse } from "../utils/api-response.js";
import mongoose from "mongoose";

export const postResult = asyncHandler(async (req, res) => {
  const { totalMarks, percentage,examName } = req.body;
  if (!totalMarks || !percentage ||!examName) {
    throw new ApiError(401, "All fields are required");
  }
  const Exam = await exam.create({
    examName
  })
  const examId = Exam._id
  const Result = await result.create({
    totalMarks,
    percentage,
    user: req.user._id,
    exam:examId
  });
  if (!Result) {
    throw new ApiResponse(401, "errors while creating result");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, Result, "result submittewd succesfully"));
});

export const getResultByStudentId = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { studentId } = req.params;
  const objectId = new mongoose.Types.ObjectId(studentId);
  console.log("studentId", objectId);

  let targetStudentId;
  if (req.user.role === "STUDENT") {
    if (userId !== objectId) {
      return next(
        new ApiError(403, "Students can only access their own results")
      );
    }
    targetStudentId = objectId;
  } else {
    targetStudentId = objectId;
  }
  const Result = await result.find({ user: targetStudentId });

  if (!Result || Result.length === 0) {
    return next(new ApiError(404, "Result not found for this user"));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, Result, "result fetched successfully"));
});
