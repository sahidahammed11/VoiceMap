// VoiceMap — Netlify Serverless Function
// Proxies requests to Gemma 4 API.
// The GEMMA_API_KEY env variable lives only on the server —
// it is never sent to the browser.

// ─── CORS headers added to EVERY response ───────────────────
const CORS_HEADERS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type':                 'application/json'
};

// ─── Helper: build a response with CORS headers ─────────────
function respond(statusCode, body) {
  return {
    statusCode,
    headers: CORS_HEADERS,
    body: typeof body === 'string' ? body : JSON.stringify(body)
  };
}

// ─── Main handler ────────────────────────────────────────────
exports.handler = async (event) => {

  // 1. Handle CORS preflight (browser sends OPTIONS before POST)
  if (event.httpMethod === 'OPTIONS') {
    return respond(200, '');
  }

  // 2. Only allow POST
  if (event.httpMethod !== 'POST') {
    return respond(405, { error: 'Method not allowed' });
  }

  // 3. Check API key is configured on the server
  const API_KEY = process.env.GEMMA_API_KEY;
  if (!API_KEY) {
    return respond(500, { error: 'GEMMA_API_KEY environment variable is not set on the server.' });
  }

  // 4. Parse request body safely
  let prompt, temperature, maxOutputTokens;
  try {
    const body = JSON.parse(event.body);
    prompt          = body.prompt;
    temperature     = typeof body.temperature     === 'number' ? body.temperature     : 0.2;
    maxOutputTokens = typeof body.maxOutputTokens === 'number' ? body.maxOutputTokens : 1024;
  } catch (parseError) {
    return respond(400, { error: 'Invalid JSON in request body.' });
  }

  // 5. Validate that prompt was actually sent
  if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
    return respond(400, { error: 'Missing required field: prompt' });
  }

  // 6. Call Gemma 4 API — wrapped in try/catch so network
  //    failures return a clean error instead of crashing
  try {
    const gemmaResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemma-3-27b-it:generateContent?key=${API_KEY}`,
      {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature, maxOutputTokens }
        })
      }
    );

    // 7. Parse Gemma response safely
    let data;
    try {
      data = await gemmaResponse.json();
    } catch (jsonError) {
      return respond(502, { error: 'Gemma API returned non-JSON response.' });
    }

    // 8. Handle error status from Gemma API
    if (!gemmaResponse.ok) {
      const gemmaError = data?.error?.message || `Gemma API error — HTTP ${gemmaResponse.status}`;
      return respond(502, { error: gemmaError });
    }

    // 9. Extract text from response
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    if (!text) {
      return respond(502, { error: 'Gemma API returned an empty response.' });
    }

    return respond(200, { text });

  } catch (networkError) {
    // Catches fetch() failures e.g. DNS error, timeout, no internet
    return respond(503, { error: 'Could not reach Gemma API: ' + networkError.message });
  }
};
