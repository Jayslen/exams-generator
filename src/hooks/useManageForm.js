import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ReviewQuestionsContext } from '../context/ReviewQuestionsContext'

export function useManageForm ({ id }) {
  const { userAnswers, setUserAnswers } = useContext(ReviewQuestionsContext)

  const EXAMS = JSON.parse(window.localStorage.getItem('exams'))
  const EXAMS_TRIES = window.localStorage.getItem('tries')
    ? JSON.parse(window.localStorage.getItem('tries'))
    : []

  const CURRENT_PROGRESS = EXAMS_TRIES?.find((item) => item.id === id)
  const CURRENT_EXAM = EXAMS?.find((exam) => exam.id === id).questions

  const [currentAnswer, setcurrentAnswer] = useState(null)
  const [currentQuestionIndex, setcurrentQuestionIndex] = useState(
    CURRENT_PROGRESS ? CURRENT_PROGRESS.progress.length : 0
  )
  const [isChecked, setIsChecked] = useState(false)
  const navigate = useNavigate()

  const CURRENT_QUESTION = CURRENT_EXAM[currentQuestionIndex]
  const { question, options, correctAnswer } = CURRENT_QUESTION

  const CURRENT_ANSWER_IS_CORRECT = currentAnswer === correctAnswer
  const CURRENT_ANSWER_IS_WRONG =
    currentAnswer !== correctAnswer && currentAnswer

  // update the useranswer if there is a progress saved in the local storage
  useEffect(() => {
    if (CURRENT_PROGRESS) {
      setUserAnswers(CURRENT_PROGRESS.progress)
    }
  }, [])

  const generateUserAnswersObj = ({
    question,
    options,
    userAnswer,
    correctAnswer,
    isCorrect
  }) => {
    return { question, options, userAnswer, correctAnswer, isCorrect }
  }

  const updateUsersAnswers = ({ userAnswer }) => {
    setUserAnswers((prev) => {
      return prev?.length > 0
        ? [
            ...prev,
            generateUserAnswersObj({
              question,
              options,
              userAnswer,
              correctAnswer,
              isCorrect: userAnswer === correctAnswer
            })
          ]
        : [
            generateUserAnswersObj({
              question,
              options,
              userAnswer,
              correctAnswer,
              isCorrect: userAnswer === correctAnswer
            })
          ]
    })
  }

  const clearExamProgress = () => {
    setUserAnswers([])
    setcurrentQuestionIndex(0)
    if (EXAMS_TRIES.length === 0 || EXAMS_TRIES.length === 1) {
      window.localStorage.removeItem('tries')
      return
    }
    window.localStorage.setItem(
      'tries',
      JSON.stringify([...EXAMS_TRIES.filter((item) => item.id !== id)])
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { exam } = Object.fromEntries(new FormData(e.target))

    // go to the review page if the last question is answered
    if (currentQuestionIndex === CURRENT_EXAM.length - 1 && currentAnswer) {
      window.localStorage.setItem(
        'tries',
        JSON.stringify([...EXAMS_TRIES.filter((item) => item.id !== id)])
      )
      window.localStorage.setItem('reviews', JSON.stringify(userAnswers))
      navigate(`/review/${id}`)
      return
    }

    // go to next question if the answer is checked
    if (currentAnswer) {
      // save the progress of the user in the local storage
      window.localStorage.setItem(
        'tries',
        JSON.stringify(
          !EXAMS_TRIES
            ? [{ id, progress: userAnswers }]
            : [
                ...EXAMS_TRIES.filter((item) => item.id !== id),
                { id, progress: userAnswers }
              ]
        )
      )
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
    CURRENT_PROGRESS,
    clearExamProgress,
    handleSubmit
  }
}
