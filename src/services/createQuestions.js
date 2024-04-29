import { GoogleGenerativeAI } from '@google/generative-ai'

export async function generateQuestions ({ prompt, apiKey }) {
  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
  const result = await model.generateContent(prompt)
  return await result.response.text()
}
