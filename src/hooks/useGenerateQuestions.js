import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createPrompt } from '../services/generatePrompt'
import { generateQuestions } from '../services/getQuestions'

export function useGenerateQuestion () {
  const [examsQuestions, setExamsQuestions] = useState([])
  const [loader, setLoader] = useState(false)
  const isIdGenerated = useRef(false)
  const navigate = useNavigate()

  const updateQuestions = ({ newQuestions, id }) => {
    setExamsQuestions((prev) => {
      if (!prev?.questions) {
        // If there are no questions, we create a new array with the new questions, and we add the id
        return {
          questions: [...newQuestions],
          id
        }
      }
      return {
        // If there are questions, we add the new questions to the existing ones and we keep the id
        ...prev,
        questions: [...newQuestions, ...prev.questions]
      }
    })
  }
  const clearQuestions = () => {
    setExamsQuestions([])
  }

  const formGenerateQuestions = (e) => {
    e.preventDefault()
    const { amount, notes } = Object.fromEntries(new FormData(e.target))

    if (!amount || !notes) {
      toast.error('Debes llenar todos los campos para continuar.')
      return
    }
    const prompt = createPrompt({
      amountOfQuestions: amount,
      text: notes
    })

    setLoader((prev) => !prev)

    generateQuestions({ prompt })
      .then((questions) => {
        let generatedExam
        if (questions.includes('`') || questions.includes('json')) {
          generatedExam = JSON.parse(
            questions.replaceAll('`', '').replace('json', '')
          )
        } else {
          generatedExam = JSON.parse(questions)
        }

        if (!isIdGenerated.current) {
          updateQuestions({
            newQuestions: generatedExam.questions,
            id: crypto.randomUUID()
          })
          isIdGenerated.current = true
        } else {
          updateQuestions({
            newQuestions: generatedExam.questions
          })
        }

        toast.success(
          `${amount} preguntas mas añadidas ${examsQuestions?.questions?.length ?? 0 + Number(amount)} preguntas en total.`
        )
      })
      .catch((error) => {
        console.error(error)
        toast.error('Ha ocurrido un error, genere las preguntas nuevamente.')
      })
      .finally(() => {
        setLoader((prev) => !prev)
      })
  }

  const goToExam = () => {
    const exams = JSON.parse(window.localStorage.getItem('exams'))
    const currentExamId = examsQuestions.id
    if (!currentExamId) {
      toast.error('Debes generar preguntas antes de generar el examen.')
      return
    }

    window.localStorage.setItem(
      'exams',
      JSON.stringify([examsQuestions])
    )

    navigate(`/exam/${currentExamId}`)
    clearQuestions()
  }
  return {
    formGenerateQuestions,
    goToExam,
    loader
  }
}
