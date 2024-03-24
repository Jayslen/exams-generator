import { createContext, useState } from 'react'

export const questionsContext = createContext()

export function QuestionsProvider ({ children }) {
  const [questions, setQuestions] = useState([])

  const updateQuestions = ({ newQuestions, id }) => {
    setQuestions((prev) => {
      if (prev?.questions) {
        console.log('hay preguntas')
        return {
          ...prev,
          questions: [...newQuestions, ...prev.questions]
        }
      }
      return {
        questions: [...newQuestions],
        id
      }
    })
  }
  return (
    <questionsContext.Provider value={{ questions, updateQuestions }}>
      {children}
    </questionsContext.Provider>
  )
}
