import express from "express"
import {isLoggedIn, validateRoutePermission} from "../middleware/auth.middleware.js"
import { validateApikey } from "../middleware/apiKey.middlewre.js"
import { changeRole, users } from "../controllers/admin.controller.js"


const router = express.Router()

router.get('/users',isLoggedIn,validateApikey,validateRoutePermission(["admin"]),users)

router.put('/users/:userId/:role',isLoggedIn,validateApikey,validateRoutePermission(["admin"]),changeRole)

export default router