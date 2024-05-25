import { useStudyCards } from '../hooks/useStudyCards'
import { Button } from './Buttons'
import { SvgSpinners270RingWithBg } from './Loader'
import '../index.css'

export function StudyFlashcardComponent ({ selectedSubjectCards }) {
  const {
    studyCards,
    showAnswer,
    currentCard,
    loader,
    handleShowAnswer,
    handleLearnedCard,
    handleRepeatCard,
    generateExtraInfo
  } = useStudyCards({ selectedSubjectCards })

  return (
    <>
      <section className="w-full grid grid-cols-[0.7fr,0.3fr] h-[450px] gap-3">
        <article className="bg-chicago-950 flex flex-col items-center px-4 justify-center relative w-full rounded">
          <div className="absolute top-5 right-5 flex gap-3 text-chicago-50 font-bold text-xl">
            <span className="text-chicago-100">
              {studyCards.filter((item) => !item.reviewed).length}
            </span>
            <span className="text-red-400">
              {studyCards.filter((item) => item.reviewed).length}
            </span>
            <span></span>
          </div>
          <h3 className="text-5xl text-center font-black text-chicago-100">
            {currentCard?.question}
          </h3>
          {showAnswer && (
            <p className="text-center text-xl text-chicago-50 py-4">
              {currentCard?.answer}
            </p>
          )}
        </article>
        <aside
          className="w-full h-full bg-chicago-950 rounded px-4 py-2 overflow-y-auto relative"
          style={{ scrollbarWidth: 'none' }}
          id="aside"
        >
          {loader && (
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
              <SvgSpinners270RingWithBg></SvgSpinners270RingWithBg>
            </div>
          )}
        </aside>
      </section>
      <footer className="grid grid-cols-[0.2fr,0.2fr,0.2fr,0.4fr] gap-2 mt-2">
        <Button
          text={'Repetir'}
          isDisabled={!showAnswer || loader}
          handleClick={handleRepeatCard}
        />
        <Button
          text={'Aprendida'}
          isDisabled={!showAnswer || loader}
          handleClick={handleLearnedCard}
        />
        <Button
          text={'Mostrar respuesta'}
          handleClick={handleShowAnswer}
          isDisabled={showAnswer}
        />
        <Button
          text={'Generar mas informacion'}
          handleClick={generateExtraInfo}
        />
      </footer>
    </>
  )
}
