import express from "express";
import cors from "cors";

import imagesToPdfRoutes from "./routes/imagesToPdfRoutes";

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get("/", (req, res) => {
  res.json({ message: "API is working" });
});

app.use("/api/uploads/images", imagesToPdfRoutes);


app.listen(7000, () => {
  console.log("Server running on port 7000");
});

// Export the Express API for Vercel
export default app;
