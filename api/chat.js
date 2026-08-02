export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // To'g'ridan-to'g'ri to'g'ri ishlaydigan API kalitingizni shu yerga yozamiz
  const apiKey = "AQ.Ab8RN6LKE66NU3EZlk8xsRS6uHWQlmhtnV8DIYWVGDUcgxshuw"; // Google AI Studio'dan olingan aniq kalitingiz

  const { contents, systemInstruction } = req.body;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction,
          contents,
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 600
          }
        })
      }
    );

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'API xatosi yuz berdi' });
  }
}
