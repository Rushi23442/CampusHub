import { course } from "../models/course.model.js";

import { material } from "../models/materials.model.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiResponse } from "../utils/api-response.js";

export const postCourses = asyncHandler(async (req, res) => {
  const { title, description, fees } = req.body;

  if (!title || !description || !fees) {
    throw new ApiError(401, "All fields are required");
  }

  const existingCourse = await course.findOne({
    title,
  });
  if (existingCourse) {
    throw new ApiError(401, "Course already exists");
  }
  const Course = await course.create({
    title,
    description,
    createdBy: req.user._id,
    fees,
  });
  if (!Course) {
    throw new ApiError(401, "error while creating");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, Course, "Course created Succesfully"));
});

export const getCourses = asyncHandler(async (req, res) => {
  const Courses = await course.find({});

  if (!Courses) {
    throw new ApiError(404, "No courses found");
  }
  return res.status(200).json(
    new ApiResponse(200,Courses,"All courses fetched")
  )
});

export const addMaterial = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  if (!courseId) {
    throw new ApiError(401, "No courseId provided");
  }

  const { title, description } = req.body;

  if (!title || !description) {
    throw new ApiError(401, "All fields are required");
  }
  const existingMaterial = await material.findOne({
    title,
  });
  if (existingMaterial) {
    throw new ApiError(401, "This material already exists");
  }

  const Material = await material.create({
    title,
    description,
    uploadedBy: req.user._id,
    course: courseId,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, Material, "Course material uploaded succesfully")
    );
});

export const getMaterial = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  if (!courseId) {
    throw new ApiError(401, "No courseId provided");
  }
  const Material = await material.find({
    course: courseId,
  });
  if (!Material) {
    throw new ApiError(404, "No material found");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, Material, "All materials fetched succesfully"));
});
