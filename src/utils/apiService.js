/**
 * apiService.js
 * Handles direct asynchronous calls to AI providers (OpenAI and Google Gemini).
 */

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';
const GEMINI_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

/**
 * Fetches a recipe from OpenAI using gpt-4o-mini.
 */
async function fetchOpenAIRecipe(apiKey, prompt) {
  const response = await fetch(OPENAI_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that generates recipes in Markdown format.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7
    })
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Invalid API Key. Please double-check your key in Settings.');
    }
    if (response.status === 429) {
      throw new Error('Rate limit exceeded or insufficient credits. Please check your AI provider billing status.');
    }
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || 'Failed to fetch from OpenAI');
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

/**
 * Fetches a recipe from Google Gemini using gemini-1.5-flash.
 */
async function fetchGeminiRecipe(apiKey, prompt) {
  const url = `${GEMINI_BASE_URL}?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      }
    })
  });

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error('Invalid API Key. Please double-check your key in Settings.');
    }
    if (response.status === 429) {
      throw new Error('Rate limit exceeded or insufficient credits. Please check your AI provider billing status.');
    }
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || 'Failed to fetch from Google Gemini');
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

/**
 * Route the request to the appropriate AI provider.
 */
export async function generateRecipeFromAI(apiConfig, prompt) {
  const { activeProvider, openaiKey, geminiKey } = apiConfig;

  if (activeProvider === 'openai') {
    if (!openaiKey) throw new Error('An API key is required to generate recipes.');
    return await fetchOpenAIRecipe(openaiKey, prompt);
  } else if (activeProvider === 'gemini') {
    if (!geminiKey) throw new Error('An API key is required to generate recipes.');
    return await fetchGeminiRecipe(geminiKey, prompt);
  } else {
    throw new Error('Invalid AI provider selected.');
  }
}
