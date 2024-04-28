import { createContext, useState } from 'react'
import { useParams } from 'react-router-dom'

export const ReviewQuestionsContext = createContext()

export function ReviewQuestionsProvider ({ children }) {
  const [userAnswers, setUserAnswers] = useState([])

  return (
    <ReviewQuestionsContext.Provider value={{ userAnswers, setUserAnswers }}>
      {children}
    </ReviewQuestionsContext.Provider>
  )
}
