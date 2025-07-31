import { announcement } from "../models/announcement.model.js";
import {asyncHandler} from "../utils/async-handler.js"
import { ApiError } from "../utils/api-error.js"; 
import {ApiResponse} from "../utils/api-response.js"


export const postAnnouncement= asyncHandler(async(req,res) => {
    const {title,message} = req.body
    if(!title||!message){
        throw new ApiError(401,"Both are required")
    }
    const Announcement = await announcement.create({
        title,
        message,
        createdBy:req.user._id
    })
    if(!Announcement){
        throw new ApiError(401,"Error while posting announcement")
    }
    return res.status(201).json(
        new ApiResponse(201,Announcement,"Announcement created succesfully")
    )
})

export const getAnnouncement = asyncHandler(async(req,res) => {
    const Announcement = await announcement.find({})

    if(!Announcement){
        throw new ApiError(401,"no announcement found")
    }
    res.status(200).json(
        new ApiResponse(200,Announcement,"Fetched announcement")
    )

})
