const Question = require("../models/Question");
const Session = require("../models/Session");

// @desc    Add additional questions to an existing session
// @route   POST /api/questions/add
// @access  Private
exports.addQuestionsToSession = async (req, res) => {
  try {
    const { sessionId, questions } = req.body;

    if (!sessionId || !Array.isArray(questions)) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    if (!questions.every(q => q.question && q.answer)) {
      return res.status(400).json({ message: "Each question must have 'question' and 'answer'" });
    }

    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    const createdQuestions = await Question.insertMany(
      questions.map((q) => ({
        session: sessionId,
        question: q.question,
        answer: q.answer,
      }))
    );

    if (!Array.isArray(session.questions)) {
      session.questions = [];
    }

    session.questions.push(...createdQuestions.map((q) => q._id));
    await session.save();

    return res.status(201).json(createdQuestions);
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};



// @desc    Pin or unpin a question
// @route   POST /api/questions/:id/pin
// @access  Private
exports.togglePinQuestion = async (req, res) => {
    try{
    const question = await Question.findById(req.params.id);
 
    if(!question) {
        return res
        .status(404)
        .json({ success: false, message: "Question not found" });
    }

question.isPinned = !question.isPinned;
await question.save();

res.status(200).json({ success: true, question });

    } catch(error){
    res.status(500).json({ message: "Server Error", error: error.message });

    }
};

// @desc    Update a note for a question
// @route   POST /api/questions/:id/note
// @access  Private
exports.updateQuestionNote = async (req, res) => {
  try {
    const { note } = req.body;
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res
        .status(404)
        .json({ success: false, message: "Question not found" });
    }

    question.note = note || "";
    await question.save();

    res.status(200).json({ success: true, question });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
