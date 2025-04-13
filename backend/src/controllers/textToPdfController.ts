import { Request, Response } from "express";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

const pdfDir = "./converted/pdfs";

// Ensure directories exist
if (!fs.existsSync(pdfDir)) {
  fs.mkdirSync(pdfDir, { recursive: true });
}

const deleteFile = (filePath: string) => {
  setTimeout(() => {
    fs.unlink(filePath, (err) => {
      if (err) console.log(`Error deleting file: ${err.message}`);
      else console.log(`File deleted: ${filePath}`);
    });
  }, 5000);
};

const textToPdf = async (req: Request, res: Response) => {
  try {
    // Check if text exists in the request body
    if (!req.body || !req.body.text) {
      res.status(400).json({
        success: false,
        message: "No text provided in the request",
      });
      return;
    }

    // Create PDF filename and path
    const pdfFilename = `${Date.now()}.pdf`;
    const pdfPath = path.join(pdfDir, pdfFilename);

    // Create PDF document
    const doc = new PDFDocument();
    const writeStream = fs.createWriteStream(pdfPath);

    // Handle writeStream errors
    writeStream.on("error", (error) => {
      console.error("Error writing to PDF:", error);
      res.status(500).json({
        success: false,
        message: "Error creating PDF file",
        error: error.message,
      });
      return;
    });

    // Set up PDF completion handler
    writeStream.on("finish", () => {
      console.log(`PDF created at ${pdfPath}`);

      // Send the file as a download to the client
      res.download(pdfPath, pdfFilename, (err) => {
        if (err) {
          console.error("Error sending file:", err);
          // Don't send another response here - headers already sent
        } else {
          console.log("The file has been sent to the frontend");
        }

        // Schedule file deletion
        deleteFile(pdfPath);
      });
    });

    // Pipe PDF to writeStream
    doc.pipe(writeStream);

    // Add text content to PDF
    doc.fontSize(12);
    doc.text(req.body.text, {
      align: "left",
      lineGap: 5,
    });

    // Finalize PDF
    doc.end();
  } catch (error) {
    console.error("Unexpected error in textToPdf:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while creating PDF",
      error: error instanceof Error ? error.message : String(error),
    });
    return;
  }
};

export default { textToPdf };
