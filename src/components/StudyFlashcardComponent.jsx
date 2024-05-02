import { Button } from './Buttons'

export function StudyFlashcardComponent ({ currentCard, showAnswer, handleShowAnswer, selectedSubjectCards, handleNexCard }) {
  return (
    <>
      <section className="w-full grid grid-cols-[0.8fr,0.2fr] gap-3">
        <article className="bg-chicago-950 h-96 flex flex-col items-center justify-center relative w-full rounded">
          <h3 className="text-5xl text-center font-black text-chicago-100">
            {currentCard.question}
          </h3>
          {showAnswer && (
            <p className="text-center text-xl text-chicago-50 py-4">
              {currentCard.answer}
            </p>
          )}
          {!showAnswer && (
            <Button
              tailwindStyles={'w-[30%] my-4'}
              text={'Mostrar respuesta'}
              handleClick={handleShowAnswer}
            />
          )}
        </article>
        <aside className="w-full">
          <ul className="w-full flex flex-col gap-2">
            {selectedSubjectCards.map(({ question }, index) => {
              return (
                <li
                  key={index}
                  className="text-sm whitespace-nowrap overflow-hidden text-ellipsis w-[220px] bg-chicago-950 text-chicago-50 px-1 py-2 rounded"
                >
                  <span>{index + 1} - </span>
                  <span>{question}</span>
                </li>
              )
            })}
          </ul>
        </aside>
        {showAnswer && <footer className=" w-full grid grid-cols-3 h-14 gap-5">
          <Button text={'Repetir'} handleClick={handleShowAnswer}/>
          <Button text={'Bien'} handleClick={handleShowAnswer}/>
          <Button text={'Facil'} handleClick={handleShowAnswer}/>
        </footer>}
      </section>
    </>
  )
}
