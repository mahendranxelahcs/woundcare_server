const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const prompt = fs.readFileSync("prompt.txt", "utf-8");
const { parseSafeJSON } = require("../utils/jsonUtils");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: process.env.GEN_MODEL });

exports.processPDF = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const filePath = req.file.path;
  try {
    const pdfData = fs.readFileSync(filePath, { encoding: "base64" });
    
    const response = await model.generateContent(
      [
        { text: prompt },
        { inlineData: { mimeType: "application/pdf", data: pdfData } }
      ],
      {
        generationConfig: {
          responseMimeType: "text/html",
          temperature: 0
        }
      }
    );
   
   
    if (response.response.candidates[0]?.content.parts[0]?.text) {
      console.log("Generated Response:", response.response.candidates[0].content.parts[0].text);

      // Directly return HTML output instead of JSON
      return res.json({ htmlContent: response.response.candidates[0].content.parts[0].text });
    }

    res.status(500).json({ error: "Error processing Response" });
  } catch (error) {
    console.error("Error processing PDF:", error);
    let errorMessage = "Error processing PDF";
    // If it's a known GoogleGenerativeAIFetchError
    if (error.name === "GoogleGenerativeAIFetchError") {
      try {
        const parsed = JSON.parse(error.message.split("]: ")[1]);
        errorMessage = parsed.error?.message || parsed.error?.status || error.message;
      } catch (parseErr) {
        errorMessage = error.message;
      }
    } else if (error.response?.data?.error?.message) {
      // Handle Axios-style API errors
      errorMessage = error.response.data.error.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    res.status(500).json({ error: errorMessage });
  }
};
