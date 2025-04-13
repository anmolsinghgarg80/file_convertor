import express from "express";
import geminiController from "../controllers/geminiController";

const router = express.Router();

router.post("/", geminiController.airesponse);

export default router;
