import express from "express";
import textToPdfController from "../controllers/textToPdfController";

const router = express.Router();

router.post("/", textToPdfController.textToPdf);

export default router;
