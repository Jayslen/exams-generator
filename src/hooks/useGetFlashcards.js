import { useState, useEffect, useRef } from 'react'
import { clearAsideSection } from '../utils/aside-section-scripts'
import { fetchNotionFlashCards } from '../services/notionDBServices'
import { filterCards } from '../utils/filterFlahscard'
import { animationBtn } from '../utils/animation-button'
import { toast } from 'react-toastify'

export function useGetFlashCards () {
  const [flashcards, setFlashCards] = useState([])
  const [selectedSubjectCards, setSelectedSubjectCards] = useState([])
  const [subjectSelected, setSubjectSelected] = useState('')
  const [modal, setModal] = useState(false)
  const [loader, setLoader] = useState(false)
  const [subjects, setSubjects] = useState([])
  const prevSubject = useRef(null)

  // chage the subjects when the flashcards change are retrieved from the databases
  useEffect(() => {
    setSubjects(
      [
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
    )
  }, [flashcards])

  const declineBtnAction = () => {
    setModal(false)
  }
  const confirmBtnAction = () => {
    setSelectedSubjectCards(flashcards.filter((item) => item.subject === prevSubject.current))
    clearAsideSection()
    // .toSorted(() => 0.5 - Math.random())
    setSubjectSelected(prevSubject.current)
    prevSubject.current = null
  }

  const handleChangeSubjectCards = (e, subject) => {
    animationBtn(e)
    if (subject === subjectSelected) {
      toast.warn('Ya estas estudiando esta materia/curso')
      return
    }
    if (selectedSubjectCards.length === 0) {
      setSubjectSelected(subject)
      setSelectedSubjectCards(
        flashcards
          .filter((item) => item.subject === subject)
        // .toSorted(() => 0.5 - Math.random())
      )
      return
    }

    prevSubject.current = subject
    setModal((prev) => !prev)
  }

  const fecthCards = () => {
    setLoader(true)
    fetchNotionFlashCards()
      .then((data) => {
        setFlashCards(data.filter(filterCards))
      })
      .catch((error) => {
        console.error(error)
      }).finally(() => {
        setLoader(false)
      })
  }

  useEffect(() => {
    setLoader(true)
    fetchNotionFlashCards()
      .then((data) => {
        setFlashCards(data.filter(filterCards))
      })
      .catch((error) => {
        console.error(error)
      }).finally(() => {
        setLoader(false)
      })
  }, [selectedSubjectCards])

  return {
    selectedSubjectCards,
    modal,
    subjectSelected,
    subjects,
    loader,
    handleChangeSubjectCards,
    declineBtnAction,
    confirmBtnAction,
    fecthCards

  }
}
