import express from "express"
import {isLoggedIn, validateRoutePermission} from "../middleware/auth.middleware.js"
import { validateApikey } from "../middleware/apiKey.middlewre.js"
import { addMaterial, getCourses, getMaterial, postCourses } from "../controllers/courses.controller.js"

const router = express.Router()

router.get('/',isLoggedIn,validateApikey,getCourses)
router.post('/',isLoggedIn,validateApikey,validateRoutePermission(["admin"]),postCourses)
router.post('/:courseId/materials',isLoggedIn,validateApikey,validateRoutePermission(["faculty"]),addMaterial)
router.get('/:courseId/materials',isLoggedIn,validateApikey,validateRoutePermission(["student","faculty"]),getMaterial)

export default router