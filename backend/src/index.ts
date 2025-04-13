import express from "express";
import cors from "cors";

import imagesToPdfRoutes from "./routes/imagesToPdfRoutes";
import geminiRoutes from "./routes/geminiRoutes";
import textToPdfRoutes from "./routes/textToPdfRoutes";

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/uploads/images", imagesToPdfRoutes);
app.use("/api/response", geminiRoutes);
app.use("/api/uploads/text", textToPdfRoutes);

app.use("/", () => console.log("Working"));

app.listen(7000, () => {
  console.log("Server running on port 7000");
});

export default app;
