import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ReviewQuestionsContext } from '../context/ReviewQuestionsContext'

export function useManageForm ({ id }) {
  const EXAMS = JSON.parse(window.localStorage.getItem('exams'))
  const CURRENT_EXAM = EXAMS.find((exam) => exam.id === id).questions

  const { userAnswers, setUserAnswers } = useContext(ReviewQuestionsContext)
  const [currentAnswer, setcurrentAnswer] = useState(null)
  const [currentQuestionIndex, setcurrentQuestionIndex] = useState(0)
  const [isChecked, setIsChecked] = useState(false)
  const navigate = useNavigate()

  const CURRENT_QUESTION = CURRENT_EXAM[currentQuestionIndex]
  const { question, options, correctAnswer } = CURRENT_QUESTION

  const CURRENT_ANSWER_IS_CORRECT = currentAnswer === correctAnswer
  const CURRENT_ANSWER_IS_WRONG = currentAnswer !== correctAnswer && currentAnswer

  const updateUsersAnswers = ({ userAnswer }) => {
    setUserAnswers((prev) => {
      return prev?.length > 0
        ? [...prev, { question, options, userAnswer, correctAnswer, isCorrect: userAnswer === correctAnswer }]
        : [{ question, options, userAnswer, correctAnswer, isCorrect: userAnswer === correctAnswer }]
    }

    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { exam } = Object.fromEntries(new FormData(e.target))

    // go to the review page if the last question is answered
    if (currentQuestionIndex === CURRENT_EXAM.length - 1 && currentAnswer) {
      localStorage.setItem('reviews', JSON.stringify(userAnswers))
      navigate(`/review/${id}`)
      return
    }

    // go to next question if the answer is checked
    if (currentAnswer) {
      setcurrentQuestionIndex((prev) => prev + 1)
      setcurrentAnswer(null)
      setIsChecked((prev) => !prev)
      e.target.reset()
      return
    }

    if (!exam) {
      toast.error('Debes seleccionar una respuesta')
      return
    }
    // check the answer
    setcurrentAnswer(exam)
    updateUsersAnswers({ userAnswer: exam })
    setIsChecked((prev) => !prev)
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
    handleSubmit
  }
}
