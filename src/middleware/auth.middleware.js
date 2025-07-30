import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/async-handler.js"
import {ApiError} from "../utils/api-error.js"
import {user} from "../models/user.model.js"

export const isLoggedIn = asyncHandler(async(req,resizeBy,next) => {
   const token = req.cookies.token
    console.log(token)
    if (!token){
        return res.status(404).json(
            new ApiResponse(404,null,"No token found")
        )
    }
    const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    //  console.log(decodedToken)
    const User = await user.findById(decodedToken.id).select("-password -refreshToken")

    //  console.log("in middle",user)

    req.user = User
    next()
    
})
// route.get('/notes',isLoggedIn,validateRoutePermission["faculty","admin"])
export const validateRoutePermission = (roles=[]) => asyncHandler(async(req,res,next) => {
    const {userId} = req.user._id


    if(!userId){
        throw new ApiError(401,"no id provided")
    }

    const User = await user.findOne({
        user :req.user._id
    })
    
    if(!User){
        throw new ApiError(401,"No User found")
    }

    const givenRole = User?.role

    req.user.role = givenRole
    // roles array mei user ka role check krega hai ki nhi
    if(!roles.includes(givenRole)){
        throw new ApiError(403,"You do not have permission to access this action")
    }
    next()

})