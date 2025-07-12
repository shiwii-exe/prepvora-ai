const { GoogleGenerativeAI } = require("@google/generative-ai");
const { questionAnswerPrompt, conceptExplainPrompt } = require("../utils/prompts");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ Robust helper to extract JSON safely from AI response
function extractJSON(rawText) {
  try {
    const cleaned = rawText
      .replace(/```json|```/gi, "")      // remove markdown code wrappers
      .replace(/^[^{\[]*/, "")           // remove anything before { or [
      .replace(/[^}\]]*$/, "")           // remove anything after } or ]
      .trim();

    return JSON.parse(cleaned);
  } catch (err) {
    throw new Error("AI returned invalid JSON:\n" + rawText);
  }
}

// 🎯 POST /api/ai/generate-questions
const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const rawText = result.response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      return res.status(500).json({ message: "AI returned empty response" });
    }

    const data = extractJSON(rawText);
    res.status(200).json(data);
  } catch (error) {
    console.error("AI Error:", error.message);
    res.status(500).json({
      message: "Failed to generate questions",
      error: error.message,
    });
  }
};

// 🎯 POST /api/ai/generate-explanation
const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = conceptExplainPrompt(question);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const rawText = result.response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      return res.status(500).json({ message: "AI returned empty explanation" });
    }

    const data = extractJSON(rawText);
    res.status(200).json(data);
  } catch (error) {
    console.error("AI Error:", error.message);
    res.status(500).json({
      message: "Failed to generate explanation",
      error: error.message,
    });
  }
};

module.exports = {
  generateInterviewQuestions,
  generateConceptExplanation,
};
