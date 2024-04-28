import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ReviewQuestionsContext } from '../context/ReviewQuestionsContext'
import { uploadNotionFlashCard, fetchNotionFlashCards } from '../services/notionDBServices'

export function useSaveReviewQuestion () {
  const { userAnswers, setUserAnswers } = useContext(ReviewQuestionsContext)
  const { id } = useParams()
  const [notionQuestions, setNotionQuestions] = useState([])
  const [submitCount, setSubmitCount] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault()
    const { subject, ...answers } = Object.fromEntries(new FormData(e.target))
    if (!answers || !subject) {
      toast.error('Por favor llene el campo y seleccione las preguntas a subir')
      return
    }
    for (const prop in answers) {
      const { question, correctAnswer } = JSON.parse(answers[prop])
      // check if the question already exists in the database
      if (notionQuestions.some((value) => value.question === question)) {
        continue
      }
      uploadNotionFlashCard({ question, correctAnswer, subject })
        .then(() => {
          setSubmitCount(prev => prev + 1)
          e.target.reset()
          toast.success('Preguntas subida exitosamente')
        })
        .catch((err) => console.log(err))
    }
  }

  // fetch the flash cards from the database
  useEffect(() => {
    fetchNotionFlashCards()
      .then((data) => setNotionQuestions(data))
      .catch((err) => console.log(err))
  }, [submitCount])

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

  return { userAnswers, notionQuestions, id, handleSubmit }
}
