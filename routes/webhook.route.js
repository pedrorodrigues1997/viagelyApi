import express from "express"
import { verifyToken } from "../middleware/jwt.js";
import {
    paymentSuccessFromWebhook
} from "../controllers/webhook.controller.js";



const router = express.Router();


router.post("/success", paymentSuccessFromWebhook);


export default router;