import { user } from "../models/user.model.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiResponse } from "../utils/api-response.js";

export const users = asyncHandler(async(req,res) => {

    const users = await user.find().select("-password")
    console.log("in admin",users)
    if(!users){
        throw new ApiError(404,"No users found")
    }
    return res.status(200).json (
        new ApiResponse(200,users,"All users fetched"))
})

export const changeRole = asyncHandler(async(req,res) => {
    const {userId,role} = req.params
   
    if(!userId){
        throw new ApiError(401,"No userId provided")
    }
    const User = await user.findOneAndUpdate(
        {_id:userId},
        {role},
        {new:true}
    ) 
    if(!User){
        throw new ApiError(404,"No user found")
    }
    return res.status(200).json(
        new ApiResponse(200,User,"Role updated Succesfully")
    )
})