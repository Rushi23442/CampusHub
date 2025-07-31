import { result } from "../models/result.model.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiResponse } from "../utils/api-response.js";
import mongoose from "mongoose";

export const postResult = asyncHandler(async(req,res) => {
    const {totalMarks,percentage} = req.body
    const {courseId} = req.params
    if(!totalMarks||!percentage ){
        throw new ApiError(401,"All fields are required")
    }
    const Result = await result.create({
        totalMarks,
        percentage,
        // course:courseId,
        user: req.user._id
    })
    if(!Result){
        throw new ApiResponse(401,"errors while creating result")
    }

    return res.status(200).json(
        new ApiResponse (200,Result,"result submittewd succesfully")
    )
})

export const getResultByStudentId = asyncHandler(async (req, res, next) => {
    const userId = req.user._id
    const { studentId } = req.params
    const objectId = new mongoose.Types.ObjectId(studentId);
    console.log("studentId",objectId)
    

    let targetStudentId
    if (req.user.role === "STUDENT") {
        if (userId !== objectId) {
            return next(
                new ApiError(403, "Students can only access their own results")
            );
        }
        targetStudentId = objectId;
    } else {
        
        targetStudentId = objectId
    }
   const Result = await result.find({ user: objectId });

    if (!Result || Result.length === 0) {
        return next(new ApiError(404, "Result not found for this user"));
    }

    

    return res
        .status(200)
        .json(new ApiResponse(200, Result, "result fetched successfully"));

})