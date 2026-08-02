export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rasmda ko'rsatilgan tokeningizni shu yerga qo'ying:
  const token = "AQ.Ab8RN6Lcn79AB9evjrMrY5Edmygztk9mbJb32laZJRjy-QBMWg"; 
  const { contents, systemInstruction } = req.body;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`,
      {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
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
