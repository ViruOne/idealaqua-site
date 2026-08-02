export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GROQ_API_KEY; 
  const { contents, systemInstruction } = req.body;

  let messages = [];
  if (systemInstruction) {
    messages.push({ role: 'system', content: systemInstruction });
  }
  
  if (contents && Array.isArray(contents)) {
    contents.forEach(c => {
      const text = c.parts && c.parts[0] ? c.parts[0].text : '';
      messages.push({ role: c.role === 'model' ? 'assistant' : 'user', content: text });
    });
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: messages,
        temperature: 0.4,
        max_tokens: 600
      })
    });

    const data = await response.json();
    
    if (data.choices && data.choices[0]) {
      const replyText = data.choices[0].message.content;
      return res.status(200).json({
        candidates: [{
          content: {
            parts: [{ text: replyText }]
          }
        }]
      });
    }

    if (data.error) {
      return res.status(400).json({ error: data.error.message });
    }

    return res.status(500).json({ error: 'Javob olishda xatolik yuz berdi' });
  } catch (error) {
    return res.status(500).json({ error: 'API xatosi yuz berdi' });
  }
}
