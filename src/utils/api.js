const API_URL = 'https://api.openai.com/v1/chat/completions';

async function fetchSummary(apiKey, prompt, maxTokens) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      prompt: prompt,
      max_tokens: maxTokens,
      n: 1,
      stop: null,
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  if (response.status !== 200) {
    throw new Error(data.error.message);
  }

  return data.choices[0].text.trim();
}

export { fetchSummary };