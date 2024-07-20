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

  const [openModal, setOpenModal] = useState(Boolean(CURRENT_PROGRESS))

  // *update the useranswer if there is a progress saved in the local storage
  // !test purpose
  // useEffect(() => {
  //   console.log(CURRENT_PROGRESS)
  //   if (CURRENT_PROGRESS) {
  //     setUserAnswers(CURRENT_PROGRESS.progress)
  //   }
  // }, [])

  const closModal = () => {
    setOpenModal((prev) => !prev)
  }

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

  // submit the answer and go to the next question
  const submitAnswer = ({ userAnswer, resetInputs }) => {
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
      resetInputs()
      return
    }

    if (!userAnswer) {
      toast.error('Debes seleccionar una respuesta')
      return
    }
    // check the answer
    setcurrentAnswer(userAnswer)
    updateUsersAnswers({ userAnswer })
    setIsChecked((prev) => !prev)
  }

  // handle the submit event to submit the answer
  const handleSubmit = (e) => {
    e.preventDefault()
    const { userAnswer } = Object.fromEntries(new FormData(e.target))
    submitAnswer({ userAnswer, resetInputs: () => e.target.reset() })
  }

  // handle the keyup event to select the answer
  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.key !== 'Enter' && isNaN(e.key)) || +e.key > 4) return

      const $formOptions = Array.from(document.querySelector('form').children)
      $formOptions.pop()

      if (e.key === 'Enter') {
        const { userAnswer } = Object.fromEntries(new FormData(document.querySelector('form')))
        submitAnswer({ userAnswer, resetInputs: () => document.querySelector('form').reset() })
        return
      }

      $formOptions.forEach((elm, index) => {
        const [$input] = elm.children
        if (!$input || $input.disabled) return
        if (index === +e.key - 1) {
          $input.checked = true
        }
      })
    }
    window.addEventListener('keyup', handleKeyPress)
    return () => window.removeEventListener('keyup', handleKeyPress)
  })
  return {
    openModal,
    currentQuestionIndex,
    currentAnswer,
    isChecked,
    CURRENT_EXAM,
    question,
    options,
    CURRENT_QUESTION,
    CURRENT_ANSWER_IS_CORRECT,
    CURRENT_ANSWER_IS_WRONG,
    clearExamProgress,
    handleSubmit,
    closModal
  }
}
