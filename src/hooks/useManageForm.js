import { useState } from 'react'

export function useManageForm ({ id }) {
  const EXAMS = JSON.parse(window.localStorage.getItem('exams'))
  const CURRENT_EXAM = EXAMS.find((exam) => exam.id === id).questions

  // const [userAnswers, setUserAnswers] = useState([])
  const [currentAnswer, setcurrentAnswer] = useState(null)
  const [currentQuestionIndex, setcurrentQuestionIndex] = useState(0)
  const [isChecked, setIsChecked] = useState(false)

  const CURRENT_QUESTION = CURRENT_EXAM[currentQuestionIndex]
  const { question, options } = CURRENT_EXAM[currentQuestionIndex]

  const CURRENT_ANSWER_IS_CORRECT = (currentAnswer === CURRENT_EXAM[currentQuestionIndex].correctAnswer)
  const CURRENT_ANSWER_IS_WRONG = (currentAnswer !== CURRENT_EXAM[currentQuestionIndex].correctAnswer && currentAnswer)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (currentAnswer) {
      setcurrentQuestionIndex(prev => prev + 1)
      setcurrentAnswer(null)
      setIsChecked(prev => !prev)
      e.target.reset()
      return
    }
    const formData = Object.fromEntries(new FormData(e.target))
    setcurrentAnswer(formData.exam)
    setIsChecked(prev => !prev)
  }
  return {
    currentQuestionIndex,
    currentAnswer,
    isChecked,
    CURRENT_EXAM,
    question,
    options,
    CURRENT_QUESTION,
    CURRENT_ANSWER_IS_CORRECT,
    CURRENT_ANSWER_IS_WRONG,
    handleSubmit,
    setcurrentQuestionIndex
  }
}
