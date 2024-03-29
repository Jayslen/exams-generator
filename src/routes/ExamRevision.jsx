import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ReviewQuestionsContext } from '../context/ReviewQuestionsContext'
import { ReviewedQuestions } from '../components/ReviewedQuestionsComponent'
// import userAnswers from '../mocks/reviewQuestions.json'

export function ExamRevision () {
  const { userAnswers, setUserAnswers } = useContext(ReviewQuestionsContext)
  const { id } = useParams()

  useEffect(() => {
    const EXAMS = JSON.parse(localStorage.getItem('exams'))
    const currentExam = EXAMS.find((exam) => exam.id === id)

    // console.log(exams)

    if (userAnswers.length === 0 && Object.prototype.hasOwnProperty.call(currentExam, 'review')) {
      setUserAnswers(currentExam.review)
    }

    if (userAnswers.length > 0) {
      currentExam.review = userAnswers
      localStorage.setItem('exams', JSON.stringify([...EXAMS.filter((exam) => exam.id !== id), currentExam]))
    }
  }, [])
  return (
    <main>
      <header className='mb-4'>
        <h1 className='text-7xl font-black'>Revision del examen</h1>
      </header>
      {userAnswers.map((value, index) => {
        return <ReviewedQuestions key={index} questionData={value} />
      })}
    </main>
  )
}
