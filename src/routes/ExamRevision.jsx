import { useContext } from 'react'
import { ReviewQuestionsContext } from '../context/ReviewQuestionsContext'
import { ReviewedQuestions } from '../components/ReviewedQuestionsComponent'
// import userAnswers from '../mocks/reviewQuestions.json'

export function ExamRevision () {
  const { userAnswers } = useContext(ReviewQuestionsContext)
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
