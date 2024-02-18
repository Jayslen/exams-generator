import { createContext, useState } from 'react'

export const questionsContext = createContext()

export function QuestionsProvider ({ children }) {
  const [questions, setQuestions] = useState(['name'])

  const updateQuestions = (newQuestions) => {
    setQuestions(newQuestions)
  }

  return (
    <questionsContext.Provider value={{ questions, updateQuestions }}>
      {children}
    </questionsContext.Provider>
  )
}
