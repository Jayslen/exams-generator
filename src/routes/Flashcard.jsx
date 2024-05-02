import { useEffect, useState } from 'react'
import { StudyFlashcardComponent } from '../components/StudyFlashcardComponent'
import { fetchNotionFlashCards } from '../services/notionDBServices'
import { animationBtn } from '../scripts/animation-button'
import coolors from 'tailwindcss/colors'
import data from '../mocks/flashcardsQuestions.json'

export function FlashcardRoute () {
  const [flashcards, setFlashCards] = useState(data)
  const [selectedSubjectCards, setSelectedSubjectCards] = useState([])
  const [showAnswer, setShowAnswer] = useState(false)
  const [index, setIndex] = useState(0)

  const handleShowAnswer = () => {
    setShowAnswer(!showAnswer)
  }

  const handleNextCard = () => {
    if (index < selectedSubjectCards.length - 1) {
      setIndex(index + 1)
    } else {
      setIndex(0)
    }
  }

  const subjects = [
    ...new Set(
      flashcards.map((item) => {
        return item.subject
      })
    )
  ].map((subject) => {
    return {
      subject,
      color: flashcards.find((item) => item.subject === subject).color
    }
  })

  useEffect(() => {
    setShowAnswer(false)
  }, [index])

  //   useEffect(() => {
  //     fetchNotionFlashCards()
  //       .then((data) => {
  //         setFlashCards(data)
  //       })
  //       .catch((error) => {
  //         console.error(error)
  //       })
  //   }, [])
  return (
    <main>
      <h1 className="font-black text-7xl">Estudio de Flahscards.</h1>
      <ul className="flex flex-wrap gap-3 my-4 w-full">
        {subjects.map(({ subject, color }, index) => {
          return (
            <li
              key={index}
              style={{
                '--bg-color': coolors[color][200],
                '--hover-bg-color': coolors[color][400]
              }}
              className="px-2 py-3 bg-[var(--bg-color)] hover:bg-[var(--hover-bg-color)] font-Satoshi transition-colors duration-500 cursor-pointer rounded"
              onClick={(e) => {
                animationBtn(e)
                setSelectedSubjectCards(
                  flashcards.filter((item) => item.subject === subject)
                )
              }}
            >
              {subject}
            </li>
          )
        })}
      </ul>
      {selectedSubjectCards.length !== 0 && (
        <StudyFlashcardComponent
          showAnswer={showAnswer}
          currentCard={selectedSubjectCards[index]}
          handleShowAnswer={handleShowAnswer}
          selectedSubjectCards={selectedSubjectCards}
          handleNexCard={handleNextCard}
        />
      )}
    </main>
  )
}
