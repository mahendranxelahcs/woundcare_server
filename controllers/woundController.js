const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: process.env.GEN_MODEL });

const prompt1 = fs.readFileSync("woundPrompt1.txt", "utf-8");
const prompt2 = fs.readFileSync("woundPrompt2.txt", "utf-8");

// ✅ Image Upload & AI Analysis Controller
exports.handleWoundImage = async (req, res) => {
  console.log("API Hitted");
  if (!req.file) return res.status(400).json({ error: "No image uploaded" });

  try {
    const filePath = req.file.path;
    console.log("Image file path: ", filePath);
    const imageData = fs.readFileSync(filePath, { encoding: "base64" });

    const response = await model.generateContent([
      { text: prompt1 },
      {
        inlineData: {
          mimeType: req.file.mimetype, // e.g., image/jpeg, image/png
          data: imageData,
        },
      },
    ]);

    const resultText = response.response.candidates[0]?.content.parts[0]?.text;
    res.json({ analysis: resultText });
  } catch (error) {
    console.error("Analysis Error:", error.message);
    res.status(500).json({ error: "Wound analysis failed" });
  }
};

// ✅ Generate Final Report Controller
exports.generateWoundReport = async (req, res) => {
  try {
    const { userAnswers, previousAnalysis } = req.body;
    const combinedPrompt = `${prompt2}\n\nPrevious Analysis:\n${previousAnalysis}\n\nUser Answers:\n${userAnswers}`;

    const response = await model.generateContent([{ text: combinedPrompt }]);

    const resultText = response.response.candidates[0]?.content.parts[0]?.text;
    res.json({ finalReport: resultText });
  } catch (error) {
    console.error("Report Error:", error.message);
    res.status(500).json({ error: "Failed to generate wound report" });
  }
};
