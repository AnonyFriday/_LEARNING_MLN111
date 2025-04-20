export const sendMessageToAI = async (message) => {
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
    }),
  });

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
};
