import express from "express"
import {
    paymentSuccessFromWebhook,
    createConnectedAccount 
} from "../controllers/webhook.controller.js";
import Stripe from "stripe";
import { verifyToken } from "../middleware/jwt.js";


const router = express.Router();


router.post("/success", express.raw({ type: 'application/json' }),paymentSuccessFromWebhook);

router.post("/create-account", verifyToken, createConnectedAccount);


export default router;