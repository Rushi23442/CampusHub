import express from "express"
import { postAnnouncement } from "../controllers/announcement.controller.js"
import { getAnnouncement } from "../controllers/announcement.controller.js"
import {isLoggedIn, validateRoutePermission} from "../middleware/auth.middleware.js"
import { validateApikey } from "../middleware/apiKey.middlewre.js"

const router = express.Router()

router.post('/announcement',isLoggedIn,validateRoutePermission(["faculty","admin"]),validateApikey,postAnnouncement)

router.get('/get-announcement',isLoggedIn,validateApikey,getAnnouncement)

export default router