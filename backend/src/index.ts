import express from "express";
import cors from "cors";

import imagesToPdfRoutes from "./routes/imagesToPdfRoutes";
import geminiRoutes from "./routes/geminiRoutes";
import textToPdfRoutes from "./routes/textToPdfRoutes";

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get("/", (req, res) => {
  res.json({ message: "API is working" });
});

app.use("/api/uploads/images", imagesToPdfRoutes);
app.use("/api/response", geminiRoutes);
app.use("/api/uploads/text", textToPdfRoutes);

app.listen(7000, () => {
  console.log("Server running on port 7000");
});

// Export the Express API for Vercel
export default app;
