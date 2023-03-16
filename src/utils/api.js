import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "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"
});

const openai = new OpenAIApi(configuration);

export const fetchSummary = async (data) => {
  try {
    //const prompt = `${basePromptPrefix}${req.body.userInput}${tip}`;
    const content = "Say this is a test";
    const response = await openai.Completion.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content },
        { role: "system", content },
      ],
      temperature: 0.7,
      max_tokens: 4000,
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
