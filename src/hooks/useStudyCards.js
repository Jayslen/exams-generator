import { useEffect, useState } from 'react'
import { generateQuestions } from '../services/createQuestions'
import { clearAsideSection, setAsideElements } from '../utils/aside-section-scripts'
import { DATE_MILISECONDS, MILLISECONDS_IN_A_DAY } from '../utils/all-constanst'
import { updateNotionCard } from '../services/notionDBServices'
import { filterCards } from '../utils/filterFlahscard'

export function useStudyCards ({ selectedSubjectCards, fecthCards }) {
  const [studyCards, setStudyCards] = useState(
    selectedSubjectCards
      .filter(filterCards)
      .map((item) => ({ ...item, reviewed: false }))
  )
  const [showAnswer, setShowAnswer] = useState(false)
  const [loader, setLoader] = useState(false)
  const currentCard = studyCards[0]

  useEffect(() => {
    if (studyCards.length === 0) {
      fecthCards()
    }
  }, [studyCards])

  const handleShowAnswer = () => {
    setShowAnswer((prev) => !prev)
  }
  const handleRepeatCard = () => {
    setStudyCards((prev) => {
      const copy = [...prev]
      const current = copy.shift()
      current.reviewed = true
      copy.push(current)
      return copy
    })
    setShowAnswer((prev) => !prev)
    clearAsideSection()
  }
  const handleLearnedCard = () => {
    // setStudyCards((prev) => {
    //   const copy = [...prev]
    //   copy.shift()
    //   return copy
    // })
    setStudyCards((prev) => prev.slice(1))
    setShowAnswer((prev) => !prev)
    clearAsideSection()
    const date = new Date(DATE_MILISECONDS + (MILLISECONDS_IN_A_DAY * 2)).toISOString()
    updateNotionCard({ pageId: currentCard.id, date })
    if (studyCards.length === 1) {
      fecthCards()
    }
  }

  const generateExtraInfo = () => {
    const question = `${currentCard?.question} ${currentCard?.answer}`
    clearAsideSection()
    setLoader(true)

    generateQuestions({
      prompt: `${question} brindame mas informacion sobre esta pregunta, el texto debe ser en español con la sintaxis de markdown, debe incluir al menos 3 parrafos con sus titulos correspondientes y al menos 2 listas con sus respectivos items ** ** estos caracteres obviarlos en los titulos los titulos deben ser ## `,
      apiKey: import.meta.env.VITE_GOOGLE_API_KEY
    })
      .then((res) => {
        const textGenereated = res
        setAsideElements({ text: textGenereated })
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setLoader(false)
      })
  }

  // update the state when the selectedSubjectCards change
  useEffect(() => {
    setShowAnswer(false)
    setStudyCards(selectedSubjectCards.filter(filterCards)
      .map((item) => ({ ...item, reviewed: false })))
  }, [selectedSubjectCards])

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (studyCards.length === 0) return
      if (e.code === 'Enter' && !showAnswer && !loader) handleShowAnswer()
      if (e.code === 'ArrowRight' && showAnswer && !loader) handleLearnedCard()
      if (e.code === 'ArrowLeft' && showAnswer && !loader) handleRepeatCard()
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => window.removeEventListener('keydown', handleKeyPress)
  })

  useEffect(() => {
    if (studyCards.length === 0) return
    if (studyCards[0].text === '' || !Object.prototype.hasOwnProperty.call(studyCards[0], 'text')) return
    setAsideElements({ text: studyCards[0].text })
  }, [studyCards])
  return {
    studyCards,
    showAnswer,
    currentCard,
    loader,
    handleShowAnswer,
    handleRepeatCard,
    handleLearnedCard,
    generateExtraInfo
  }
}
