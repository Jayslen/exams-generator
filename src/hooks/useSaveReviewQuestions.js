import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ReviewQuestionsContext } from '../context/ReviewQuestionsContext'
import { uploadNotionFlashCard } from '../services/notionDBServices'

export function useSaveReviewQuestion () {
  const { userAnswers, setUserAnswers } = useContext(ReviewQuestionsContext)
  const { id } = useParams()

  const handleSubmit = (e) => {
    e.preventDefault()
    const { subject, ...answers } = Object.fromEntries(new FormData(e.target))
    if (!answers || !subject) {
      toast.error('Por favor llene el campo y seleccione las preguntas a subir')
      return
    }
    for (const prop in answers) {
      const { question, correctAnswer } = JSON.parse(answers[prop])
      uploadNotionFlashCard({ question, correctAnswer, subject })
    }
  }

  useEffect(() => {
    // save the review questions in the local storage to keep the state
    const EXAMS = JSON.parse(localStorage.getItem('exams'))
    const currentExam = EXAMS.find((exam) => exam.id === id)

    if (
      userAnswers.length === 0 &&
        Object.prototype.hasOwnProperty.call(currentExam, 'review')
    ) {
      setUserAnswers(currentExam.review)
    }

    if (userAnswers.length > 0) {
      currentExam.review = userAnswers
      localStorage.setItem(
        'exams',
        JSON.stringify([...EXAMS.filter((exam) => exam.id !== id), currentExam])
      )
    }
  }, [])

  return { userAnswers, id, handleSubmit }
}
