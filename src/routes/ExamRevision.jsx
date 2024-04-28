import { useSaveReviewQuestion } from '../hooks/useSaveReviewQuestions'
import { ReviewedQuestions } from '../components/ReviewedQuestionsComponent'
import { LinkComponent } from '../components/LinkComponent'
import { Button } from '../components/Buttons'

export function ExamRevision () {
  const { userAnswers, id } = useSaveReviewQuestion()
  return (
    <main className="relative">
      <header className="mb-4">
        <h1 className="text-7xl font-black">Revision del examen</h1>
      </header>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const answers = Object.fromEntries(new FormData(e.target))
          for (const prop in answers) {
            const { question, correctAnswer } = JSON.parse(answers[prop])
            fetch('http://localhost:5000/submitForm', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'apllication/json'
              },
              body: JSON.stringify({
                question,
                answer: correctAnswer,
                subject: 'Fundamentos del computador'
              })
            })
              .then((res) => res.json())
              .then((res) => console.log(res))
          }
        }}
      >
        {userAnswers.map((value, index) => {
          return <ReviewedQuestions key={index} questionData={value} />
        })}
        <Button
          text={'Enviar'}
          type="submit"
          tailwindStyles={'fixed top-[6.9rem] right-64 w-24 h-24 rounded-full'}
        />
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
