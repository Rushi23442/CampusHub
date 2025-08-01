import {apiKey} from "../models/apiKey.model.js"
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";

export const validateApikey = asyncHandler(async (req, res, next) => {
    const ApiKey = req.headers["x-api-key"]
    if (!ApiKey) {
        throw new ApiError(401, "Missing api key")
    }

    const validApikey = await apiKey.findOne({
        apiKey:ApiKey
    })

    if (!validApikey) {
        throw new ApiError(401, "Invalid api key")
    }

    next()
})