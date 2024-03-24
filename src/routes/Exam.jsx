import { useId } from 'react'
import { useParams } from 'react-router-dom'
import { CheckIcon, XIcon } from '../assets/Icons'
import { useManageForm } from '../hooks/useManageForm'
import { Button } from '../components/Buttons'
import { QuestionComponent } from '../components/QuestionComponent'

export function Exam () {
  const { id } = useParams()
  const {
    currentQuestionIndex,
    currentAnswer,
    isChecked,
    CURRENT_EXAM,
    question,
    options,
    CURRENT_QUESTION,
    CURRENT_ANSWER_IS_CORRECT,
    CURRENT_ANSWER_IS_WRONG,
    handleSubmit,
    setcurrentQuestionIndex
  } = useManageForm({ id })

  const notification = CURRENT_ANSWER_IS_CORRECT
    ? 'Has acertado'
    : 'Has fallado'

  return (
    <main className="grid place-content-center">
      <section className="grid grid-cols-[0.6fr,0.4fr] w-full">
        <div>
          <span className="font-bold text-[#5a5552] text-lg">
            Pregunta {`${currentQuestionIndex + 1} / ${CURRENT_EXAM.length}`}
          </span>
          <h1 className="w-full font-black text-6xl">{question}</h1>
        </div>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>

          {(CURRENT_ANSWER_IS_CORRECT || CURRENT_ANSWER_IS_WRONG) && (
            <p className="font-bold italic absolute -top-10">{notification}</p>
          )}

          {options.map((value, index) => {
            return (
              <QuestionComponent
                key={index}
                value={value}
                index={index}
                currentAnswer={currentAnswer}
                isChecked={isChecked}
                CURRENT_ANSWER_IS_CORRECT={CURRENT_ANSWER_IS_CORRECT}
                CURRENT_ANSWER_IS_WRONG={CURRENT_ANSWER_IS_WRONG}
                CURRENT_QUESTION={CURRENT_QUESTION}
              />
            )
          })}
          <footer className="gap-3 grid grid-cols-2">
            <Button
              text={'Pregunta anterior'}
              handleClick={() => {
                setcurrentQuestionIndex((prev) => prev - 1)
              }}
              type={'button'}
            />
            <Button text={'Verificar pregunta'} type={'submit'} />
          </footer>
        </form>
      </section>
    </main>
  )
}
