import { useStudyCards } from '../hooks/useStudyCards'
import { Button } from './Buttons'
import { LoaderSvg } from './Loader'

export function StudyFlashcardComponent ({ selectedSubjectCards, fecthCards }) {
  const {
    studyCards,
    showAnswer,
    currentCard,
    loader,
    handleShowAnswer,
    handleLearnedCard,
    handleRepeatCard,
    generateExtraInfo
  } = useStudyCards({ selectedSubjectCards, fecthCards })
  const isButtonDisabled = showAnswer || loader || studyCards.length === 0
  const isButtonStudyCardDisabled = !showAnswer || loader || studyCards.length === 0

  return (
    <>
      <section className="w-full grid grid-cols-[0.7fr,0.3fr] h-[450px] gap-3">
        <article className="bg-chicago-950 flex flex-col items-center px-4 justify-center relative w-full rounded">
          {studyCards.length === 0 && <h3 className='text-3xl text-chicago-50 font-black text-center'>Has completado todas las Flahscards, no hay mas para mostrar</h3>}
          <div className="absolute top-5 right-5 flex gap-3 text-chicago-50 font-bold text-xl">
            <span className="text-chicago-100">
              {studyCards.filter((item) => !item.reviewed).length}
            </span>
            <span className="text-red-400">
              {studyCards.filter((item) => item.reviewed).length}
            </span>
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
              <LoaderSvg props={{ color: 'white' }}/>
            </div>
          )}
        </aside>
      </section>
      <footer className="grid grid-cols-[0.2fr,0.2fr,0.2fr,0.4fr] gap-2 mt-2">
        <Button
          text={'Repetir'}
          isDisabled={isButtonStudyCardDisabled}
          handleClick={handleRepeatCard}
        />
        <Button
          text={'Aprendida'}
          isDisabled={isButtonStudyCardDisabled}
          handleClick={handleLearnedCard}
        />
        <Button
          text={'Mostrar respuesta'}
          handleClick={handleShowAnswer}
          isDisabled={isButtonDisabled}
        />
        <Button
          text={'Generar mas informacion'}
          handleClick={generateExtraInfo}
          isDisabled={isButtonDisabled}
        />
      </footer>
    </>
  )
}
