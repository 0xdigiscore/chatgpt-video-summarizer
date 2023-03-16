import openai from "openai";

openai.apiKey = "your_api_key";

export const fetchSummary = async (url) => {
  try {
    const response = await openai.Completion.create({
      engine: "davinci-codex",
      prompt: `Please summarize the video at the following URL: ${url}`,
      max_tokens: 100,
      n: 1,
      stop: null,
      temperature: 1,
    });

    if (response.choices && response.choices.length > 0) {
      return response.choices[0].text.trim();
    } else {
      throw new Error("No summary found.");
    }
  } catch (error) {
    console.error("Error fetching summary:", error);
    throw error;
  }
};
