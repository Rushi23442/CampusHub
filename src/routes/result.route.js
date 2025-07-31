import express from "express"
import { validateApikey } from "../middleware/apiKey.middlewre.js"
import { isLoggedIn , validateRoutePermission} from "../middleware/auth.middleware.js"
import { getResultByStudentId, postResult } from "../controllers/result.controller.js"

const router = express.Router()

router.post("/post-result",isLoggedIn,validateApikey,validateRoutePermission(["admin"]), postResult)
router.get("/get-result/:studentId",isLoggedIn,validateApikey, getResultByStudentId)

export default router