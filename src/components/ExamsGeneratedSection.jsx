import { useState, useEffect } from 'react'
import { ExamGenerated } from './ExamsGeneratedComponent'

export function ExamsGeneratedSection () {
  const EXAMS_IN_STORAGE = JSON.parse(localStorage.getItem('exams'))
  const [savedExams, setSavedExams] = useState(EXAMS_IN_STORAGE ?? [])

  const removeExam = ({ id }) => {
    setSavedExams(savedExams.filter((exam) => exam.id !== id))
  }

  // Save exams in local storage, the function above saved the previous state
  useEffect(() => {
    localStorage.setItem('exams', JSON.stringify(savedExams))
  }, [savedExams])
  return (
    <aside
      style={{ scrollbarWidth: 'none' }}
      className="h-full w-full overflow-y-scroll hidden md:block"
    >
      <h2 className="font-black text-xl">Examenes generados.</h2>
      <ul className="flex flex-col gap-3">
        {savedExams.map((exam, index) => {
          return (
            <ExamGenerated
              key={index}
              title={exam.title}
              amount={exam.questions.length}
              hasRevision={Object.prototype.hasOwnProperty.call(exam, 'review')}
              id={exam.id}
              removeItemAction={removeExam}
            />
          )
        })}
      </ul>
    </aside>
  )
}
