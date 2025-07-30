import express from "express"
import { registerUser,login,getMe } from "../controllers/user.controller.js"
import {isLoggedIn} from "../middleware/auth.middleware.js"
import { generateApiKey } from "../controllers/user.controller.js"

const router = express.Router()

router.post("/register", registerUser)
router.post('/login',login)
router.get('/profile',isLoggedIn,getMe)
router.get("/generate-apikey", isLoggedIn,generateApiKey);

export default router