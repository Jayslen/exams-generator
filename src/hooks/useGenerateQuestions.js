import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createPrompt } from '../utils/generatePrompt'
import { generateQuestions } from '../services/createQuestions'

export function useGenerateQuestion () {
  const [examsQuestions, setExamsQuestions] = useState([])
  const [loader, setLoader] = useState(false)
  const isItGenerated = useRef(false)
  const navigate = useNavigate()

  const updateQuestions = ({ newQuestions, id, title }) => {
    setExamsQuestions((prev) => {
      if (!prev?.questions) {
        // If there are no questions, we create a new array with the new questions, and we add the id
        return {
          questions: [...newQuestions],
          title,
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

  const formGenerateQuestions = (e) => {
    e.preventDefault()
    const { amount, notes, title } = Object.fromEntries(new FormData(e.target))

    if (!amount || !notes) {
      toast.error('Debes llenar todos los campos para continuar.')
      return
    }
    const prompt = createPrompt({
      amountOfQuestions: amount,
      text: notes
    })

    setLoader((prev) => !prev)

    generateQuestions({ prompt, apiKey: import.meta.env.VITE_GOOGLE_API_KEY })
      .then((questions) => {
        let generatedExam
        if (questions.includes('`') || questions.includes('json')) {
          generatedExam = JSON.parse(
            questions.replaceAll('`', '').replace('json', '')
          )
        } else {
          generatedExam = JSON.parse(questions)
        }

        if (!isItGenerated.current) {
          updateQuestions({
            newQuestions: generatedExam.questions,
            id: crypto.randomUUID(),
            title
          })
          isItGenerated.current = true
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
      JSON.stringify(exams ? [...exams, examsQuestions] : [examsQuestions])
    )

    navigate(`/exam/${currentExamId}`)
    setExamsQuestions([])
  }
  return {
    formGenerateQuestions,
    goToExam,
    loader
  }
}
