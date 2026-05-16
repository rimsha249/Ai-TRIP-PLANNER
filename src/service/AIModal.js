const generateAITrip = async (formData) => {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  const prompt = `Create a travel plan for ${formData.location}, ${formData.days} days, ${formData.travelers} travelers, ${formData.budget} budget. Return JSON only:
{"hotels":[{"hotelName":"","address":"","price":"","rating":"","description":""}],"itinerary":{"day1":[{"placeName":"","details":"","ticketPrice":"","timeToVisit":""}]}}`;

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: prompt }],
      temperature: 1,
      max_tokens: 4096,
    })
  });

  const data = await response.json();
  const text = data.choices[0].message.content;
  const clean = text.replace(/```json|```/g, '').trim();
  return JSON.parse(clean);
};

export default generateAITrip;