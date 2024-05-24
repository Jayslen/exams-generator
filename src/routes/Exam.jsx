import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useManageForm } from '../hooks/useManageForm'
import { Button } from '../components/Buttons'
import { QuestionComponent } from '../components/QuestionComponent'
import { ModalComponent } from '../components/ModalComponent'

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
    CURRENT_PROGRESS,
    clearExamProgress,
    handleSubmit
  } = useManageForm({ id })
  const [openModal, setOpenModal] = useState(Boolean(CURRENT_PROGRESS))
  const closModal = () => {
    setOpenModal((prev) => !prev)
  }

  const ANSWER_MESSAGE = CURRENT_ANSWER_IS_CORRECT
    ? 'Has acertado'
    : 'Has fallado'
  const BUTTON_TEXT =
    currentQuestionIndex === CURRENT_EXAM.length - 1 && currentAnswer
      ? 'Revision de examen'
      : isChecked
        ? 'Siguiente pregunta'
        : 'Verificar pregunta'

  return (
    <main className="grid place-content-center lg:h-screen">
      {openModal && (
        <ModalComponent
          title={'Progreso guardado encontrado.'}
          firstText={'Desea contiar con el progreso pasado o empezar desde cero:'}
          confirmBtnText={'Borrar progreso'}
          confirmBtnAction={clearExamProgress}
          declineBtnText={'Continuar'}
          closeModal={closModal}
        />
      )}

      <section className="flex flex-col gap-12 lg:gap-4 lg:grid lg:grid-cols-[0.65fr,0.35fr] max-w-5xl lg:w-[1000px]">
        <div>
          <span className="font-bold text-[#5a5552] text-lg">
            Pregunta {`${currentQuestionIndex + 1} / ${CURRENT_EXAM.length}`}
          </span>
          <h1 className="w-full font-black text-4xl lg:text-6xl text-balance">
            {question}
          </h1>
        </div>

        <form className="flex flex-col gap-3 relative" onSubmit={handleSubmit}>
          {(CURRENT_ANSWER_IS_CORRECT || CURRENT_ANSWER_IS_WRONG) && (
            <p className="font-bold italic text-lg absolute -top-10 left-4">
              {ANSWER_MESSAGE}
            </p>
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
          <footer className="grid grid-cols-1">
            <Button text={BUTTON_TEXT} type={'submit'} />
          </footer>
        </form>
      </section>
    </main>
  )
}
