const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => `
You are an AI trained to generate technical interview questions and answers.

Task:
- Role: ${role}
- Candidate Experience: ${experience} years
- Focus Topics: ${topicsToFocus}
- Write ${numberOfQuestions} interview questions.
- For each question, generate a detailed, beginner-friendly answer.
- Use code examples if relevant (keep them short and focused).
- Format the output as a clean, valid JSON array.

Example:
[
  {
    "question": "What is a closure in JavaScript?",
    "answer": "A closure is a function that has access to its outer function scope even after the outer function has returned.\\n\\nExample:\\n\\nfunction outer() {\\n  let count = 0;\\n  return function inner() {\\n    count++;\\n    console.log(count);\\n  };\\n}"
  },
  ...
]

Important: ONLY return a valid JSON array. Do NOT include any explanation, heading, or markdown formatting outside the JSON.
`;

const conceptExplainPrompt = (question) => `
You are an AI trained to explain software engineering interview questions.

Task:
- Explain the following interview question clearly, step-by-step, for beginner developers.
- Question: "${question}"
- Provide relevant technical context, simple analogies, and examples.
- Add a code block if helpful.
- Include a short and clear "title" for this concept.

Return ONLY a valid JSON object like:

{
  "title": "Short Concept Title",
  "explanation": "Detailed explanation here..."
}

Important: Do NOT include markdown, extra text, or comments — only valid JSON output.
`;

module.exports = {
  questionAnswerPrompt,
  conceptExplainPrompt
};
