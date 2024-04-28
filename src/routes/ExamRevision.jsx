import { useSaveReviewQuestion } from '../hooks/useSaveReviewQuestions'
import { ReviewedQuestions } from '../components/ReviewedQuestionsComponent'
import { LinkComponent } from '../components/LinkComponent'
import { DetailsComponent } from '../components/DetailsComponent'

export function ExamRevision () {
  const { userAnswers, id, handleSubmit, notionQuestions } = useSaveReviewQuestion()
  return (
    <main className="relative">
      <header className="mb-4">
        <h1 className="text-7xl font-black">Revision del examen</h1>
      </header>

      <form
        onSubmit={handleSubmit}
      >
        <DetailsComponent/>
        {userAnswers.map((value, index) => {
          return <ReviewedQuestions key={index} questionData={value} databaseQuestions={notionQuestions} />
        })}
      </form>
      <footer className="flex justify-end gap-2">
        <LinkComponent text={'Inicio'} linkTo="/" />
        <LinkComponent
          text={'Intentar examen de nuevo'}
          linkTo={`/exam/${id}`}
        />
      </footer>
    </main>
  )
}
