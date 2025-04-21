// ===========================
// === Element references & Libs
// ===========================

import { marked } from "marked";

// ===========================
// === Methods
// ===========================

/**
 * Create a system instruction for the chatbot
 * @returns
 */
const createSystemInstruction = () => {
  return (
    "Bạn là một trợ lý học thuật chuyên môn cao về môn Triết học Mác - Lênin. " +
    "Bạn chỉ trả lời bằng **tiếng Việt**, giọng điệu học thuật, ngắn gọn, rõ ràng. " +
    "Nếu người dùng sử dụng từ ngữ thô tục, phản cảm hoặc không liên quan đến triết học Mác - Lênin, bạn phải lịch sự từ chối trả lời. " +
    "Khi phù hợp, bạn có thể trình bày câu trả lời dạng gạch đầu dòng để dễ hiểu."
  );
};

/**
 * Generate an answer from AI
 * @param {*} message
 * @returns
 */
export const generateAnswerFromAI = async (message) => {
  const geminiApiKey = "AIzaSyBoYWSfNg7P_7zIl7eSV-JB7OEdCWprAUk";
  const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`;

  const response = await fetch(geminiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: message,
            },
          ],
        },
      ],

      generationConfig: {
        maxOutputTokens: 500, // max length of response
        temperature: 0.2, // level of creativity
        topP: 0.9,
        topK: 1,
        stopSequences: ["###", "[END]", "\n\n\n"],
      },

      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: 1 },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: 1 },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: 1 },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: 1 },
      ],

      systemInstruction: {
        parts: [
          {
            text:
              "Bạn là một trợ lý học thuật chuyên môn cao về môn Triết học Mác - Lênin. " +
              "Bạn chỉ trả lời bằng **tiếng Việt**, giọng điệu học thuật, ngắn gọn, rõ ràng. " +
              "Nếu người dùng sử dụng từ ngữ thô tục, phản cảm hoặc không liên quan đến triết học Mác - Lênin, bạn phải lịch sự từ chối trả lời. " +
              "Khi phù hợp, bạn có thể trình bày câu trả lời dạng gạch đầu dòng để dễ hiểu.",
          },
        ],
      },
    }),
  });

  const data = await response.json();
  return marked.parse(data.candidates[0].content.parts[0].text); // return the response after parsing to html
};
