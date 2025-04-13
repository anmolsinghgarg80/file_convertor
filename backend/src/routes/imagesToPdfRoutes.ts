import express from "express";
import imagesToPdfController from "../controllers/imagesToPdfController";
import multer from "multer";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({storage});

router.post(
  "/",
  upload.array("uploadedimages"),
  imagesToPdfController.convertImagesToPdf
);

export default router;
