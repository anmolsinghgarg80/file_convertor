import { GoogleGenerativeAI } from "@google/generative-ai";
import { Request, Response } from "express";

const GeminiApiKey = process.env.GeminiApikey || "";

const airesponse = async (req: Request, res: Response) => {
  try {
    // Check if req.body exists
    if (!req.body) {
      res.status(400).json({
        error: "Request body is missing",
      });
      return;
    }

    const genAI = new GoogleGenerativeAI(GeminiApiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = req.body.question;

    if (!prompt) {
      res.status(400).json({
        error: "Question is required in the request body",
      });
      return;
    }

    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    res.status(200).json({
      reply: result,
    });
  } catch (error) {
    console.error("Error processing AI response:", error);
    res.status(500).json({
      error: "Failed to get AI response",
    });
  }
};

export default { airesponse };
