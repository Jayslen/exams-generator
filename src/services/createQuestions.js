import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI('AIzaSyDHV2Y9xlKG187bzqVdRIiqVFweR472iNs')

export async function generateQuestions ({ prompt }) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
  const result = await model.generateContent(prompt)
  return await result.response.text()
}
