import { Request, Response } from "express";
import { PDFDocument } from "pdf-lib";

const convertImagesToPdf = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      res.status(400).json({ message: "No images uploaded." });
      return;
    }

    const pdfDoc = await PDFDocument.create();

    for (const file of files) {
      const buffer = file.buffer;
      const mimetype = file.mimetype;

      let image;
      if (mimetype === "image/jpeg") {
        image = await pdfDoc.embedJpg(buffer);
      } else if (mimetype === "image/png") {
        image = await pdfDoc.embedPng(buffer);
      } else {
        res.status(400).json({ message: "Unsupported image type." });
        return;
      }

      const page = pdfDoc.addPage([image.width, image.height]);
      page.drawImage(image, {
        x: 0,
        y: 0,
        width: image.width,
        height: image.height,
      });
    }

    const pdfBytes = await pdfDoc.save();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=converted.pdf");
    res.send(Buffer.from(pdfBytes));
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to convert images to PDF." });
    return;
  }
};

export default { convertImagesToPdf };
