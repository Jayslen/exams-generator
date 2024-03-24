import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { FullScreenIcon } from '../assets/Icons'
import { PromptInput } from '../components/PromptInput'
import { Button } from '../components/Buttons'
import { useGenerateQuestion } from '../hooks/useGenerateQuestions'

export function Root () {
  const { formGenerateQuestions, goToExam } = useGenerateQuestion()
  return (
    <main>
      <header>
        <h1 className="text-7xl font-black">
          Practica generando generando tus examnes.
        </h1>
        <p className="text-4xl my-4">
          Genera tus exames a partir de un tema en especifico o de tus notas
          personales.
        </p>
      </header>
      <form
        className="my-4 flex flex-col w-[70%]"
        onSubmit={formGenerateQuestions}
      >
        <div className="grid grid-cols-[0.7fr,0.4fr] gap-3">
          <PromptInput
            type={'text'}
            title={'Titulo'}
            placeholder={'Ej: Fundamentos de programación'}
            name={'title'}
          />
          <PromptInput
            type={'number'}
            title={'Cantidad de preguntas'}
            placeholder={'10'}
            name={'amount'}
            obligatory={true}
          />
        </div>
        <label className="col-span-2 row-span-2 relative">
          <div className="absolute bottom-4 right-3">{<FullScreenIcon />}</div>
          <span className="font-black text-2xl font-Satoshi block my-2">
            Apuntes
          </span>
          <textarea
            name="notes"
            rows="15"
            className="inputs resize-none"
          ></textarea>
        </label>
        <footer className='flex gap-4'>
          <Button text={'Generar Preguntas'} type={'submit'}/>
          <Button text={'Generar Examen'} handleClick={goToExam} />

        </footer>

      </form>
      <ToastContainer />
    </main>
  )
}
