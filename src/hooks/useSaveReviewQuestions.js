import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ReviewQuestionsContext } from '../context/ReviewQuestionsContext'

export function useSaveReviewQuestion () {
  const { userAnswers, setUserAnswers } = useContext(ReviewQuestionsContext)
  const { id } = useParams()

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

  return { userAnswers, id }
}
