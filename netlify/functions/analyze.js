exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const API_KEY = process.env.GEMMA_API_KEY;
  if (!API_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: 'GEMMA_API_KEY not set' }) };
  }

  const { prompt, temperature = 0.2, maxOutputTokens = 1024 } = JSON.parse(event.body);

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemma-3-27b-it:generateContent?key=${API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature, maxOutputTokens }
      })
    }
  );

  const data = await response.json();
  if (!response.ok) {
    return { statusCode: 502, body: JSON.stringify({ error: data.error?.message }) };
  }

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  return { statusCode: 200, body: JSON.stringify({ text }) };
};
