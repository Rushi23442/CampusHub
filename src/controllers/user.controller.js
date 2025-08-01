import { user } from "../models/user.model.js";
import { ApiError } from "../utils/api-error.js";
import {ApiResponse} from "../utils/api-response.js"
import { asyncHandler } from "../utils/async-handler.js";
import crypto from "crypto"
import {apiKey} from "../models/apiKey.model.js"
import jwt from "jsonwebtoken"

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password,role } = req.body;
  if (!name || !email || !password) {
    throw new ApiError(401, "all fields are required");
  }
  const existingUser = await user.findOne({ email });
  if (existingUser) {
    throw new ApiError(401, "User already exist");
  }
  const User = await user.create({
    name,
    email,
    password,
    role
  });
  if (!User) {
    throw new ApiError(401, "Error while registering");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, User, "User succesfully created"));
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(401, "all fields are required");
  }
  const User = await user.findOne({ email });
  if (!User) {
    throw new ApiError(401, "no user exists please register");
  }
  const isMatched = User.isPasswordCorrect(password);
  if (!isMatched) {
    throw new ApiError(401, "no user exists please register");
  }
  const cookieOptions = {
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  };

    const token = jwt.sign(
    {
      id: User._id,
      username: User.username,
      email: User.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
  console.log(token)

  res
    .status(201)
    .cookie("token", token, cookieOptions)
    .json(new ApiResponse(201, User, "user login successfully"));
});

export const generateApiKey = asyncHandler(async (req,res) => {
    const userId = req.user._id
    const genApiKey = crypto.randomBytes(32).toString("hex");

    const ApiKey = await apiKey.create({
        userId,
        apiKey: genApiKey
    })

    if (!ApiKey) {
        throw new ApiError(401, "failed to generate api key")
    }

    res.status(201).json(new ApiResponse(201, ApiKey, "api key generated successfully"))
})
export const getMe = asyncHandler(async (req, res) => {
  
  const User = await user.findById(req.user._id).select("-password");
  console.log(User);

  if (!User) {
    throw new ApiError(401,"Invalid token")
  }

  return res
    .status(200)
    .json(new ApiResponse(200, User, "User info fetched Succesfully"));
});
