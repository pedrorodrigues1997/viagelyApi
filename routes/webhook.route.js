import express from "express"
import {
    paymentSuccessFromWebhook 
} from "../controllers/webhook.controller.js";
import Stripe from "stripe";


const router = express.Router();


router.post("/success", express.raw({ type: 'application/json' }),paymentSuccessFromWebhook);


export default router;