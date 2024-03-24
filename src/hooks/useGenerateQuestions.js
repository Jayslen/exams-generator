import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createPrompt } from '../services/generatePrompt'
import { generateQuestions } from '../services/getQuestions'
import { questionsContext } from '../context/QuestionsContext'

export function useGenerateQuestion () {
  const { updateQuestions, questions: examsQuestions } = useContext(questionsContext)
  const navigate = useNavigate()
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

        updateQuestions({ newQuestions: generatedExam.questions, id: '7894564' })
        toast.success(`${amount} mas añadidas, Total de preguntas ${examsQuestions.length + Number(amount)}`)
      })
      .catch((error) => {
        console.error(error)
        toast.error('Ha ocurrido un error.')
      })
      .finally(() => {
        console.log('Peticion finalizada')
      })
  }

  const goToExam = () => {
    const exams = JSON.parse(window.localStorage.getItem('exams'))
    window.localStorage.setItem(
      'exams',
      JSON.stringify([
        exams,
        examsQuestions
      ])
    )
    navigate('/exam/7894564')
  }
  return {
    formGenerateQuestions,
    goToExam
  }
}
