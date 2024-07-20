import { StudyFlashcardComponent } from '../components/StudyFlashcardComponent'
import { ModalComponent } from '../components/ModalComponent'
import { LoaderSvg } from '../components/Loader'
import { useGetFlashCards } from '../hooks/useGetFlashcards'
import coolors from 'tailwindcss/colors'
// import data from '../mocks/flashcardsQuestions.json'

export function FlashcardRoute () {
  const {
    selectedSubjectCards,
    subjects,
    modal,
    subjectSelected,
    loader,
    declineBtnAction,
    confirmBtnAction,
    handleChangeSubjectCards,
    fecthCards
  } = useGetFlashCards()
  return (
    <main>
      {modal && (
        <ModalComponent
          title={'¿Desea cambiar las flashcard?'}
          firstText={`Estas estudian flashcard actualmente sobre la materia/curso ${selectedSubjectCards[0].subject}`}
          declineBtnText={'Cancelar'}
          closeModal={declineBtnAction}
          confirmBtnText={'Cambiar cards'}
          confirmBtnAction={confirmBtnAction}
        />
      )}
      <h1 className="font-black text-7xl">Estudio de Flahscards.</h1>
      {loader && subjects.length === 0 && <LoaderSvg props={{ color: 'black' }} />}
      {subjects.length === 0 && !loader && (
        <p className='my-4 inline-block'>No Hay mas flashcards para mostrar</p>
      )}
      {subjects.length > 0 && (
        <ul className="flex flex-wrap items-center gap-3 my-4 w-full">
          {subjects.map(({ subject, color }, index) => {
            return (
              <li
                key={index}
                style={{
                  '--bg-color': color === 'default' ? coolors.gray[300] : coolors[color][300],
                  '--hover-bg-color': color === 'default' ? coolors.gray[500] : coolors[color][500]
                }}
                className={`px-2 py-3 bg-[var(--bg-color)] hover:bg-[var(--hover-bg-color)] hover:opacity-100 font-Satoshi transition-colors duration-500 cursor-pointer rounded ${subjectSelected === subject ? 'opacity-100' : 'opacity-50'}`}
                onClick={(e) => {
                  handleChangeSubjectCards(e, subject)
                }}
              >
                {subject}
              </li>
            )
          })}
      {loader && <LoaderSvg props={{ color: 'black', width: '40', height: '40' }} />}

        </ul>
      )}

      {selectedSubjectCards.length !== 0 && (
        <StudyFlashcardComponent
          selectedSubjectCards={selectedSubjectCards}
          fecthCards={fecthCards}
        />
      )}
    </main>
  )
}
