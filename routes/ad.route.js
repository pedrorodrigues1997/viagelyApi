import express from "express";
import {verifyToken} from "../middleware/jwt.js";
import{
    createAd,
    deleteAd,
    getAd,
    getAds
} from "../controllers/ad.controller.js";

const router = express.Router();
router.post("/", verifyToken, createAd);
router.delete("/:id", verifyToken, deleteAd);

router.get("/single/:id", getAd);

router.get("/", getAds);


export default router;


