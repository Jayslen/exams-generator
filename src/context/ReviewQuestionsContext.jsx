import { createContext, useState } from 'react'

export const ReviewQuestionsContext = createContext()

export function ReviewQuestionsProvider ({ children }) {
  const [userAnswers, setUserAnswers] = useState([])

  return (
    <ReviewQuestionsContext.Provider value={{ userAnswers, setUserAnswers }}>
      {children}
    </ReviewQuestionsContext.Provider>
  )
}
