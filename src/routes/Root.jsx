import 'react-toastify/dist/ReactToastify.css'
import { PromptInput } from '../components/PromptInput'
import { Button } from '../components/Buttons'
import { LoadingScreen } from '../components/LoadingScreen'
import { useGenerateQuestion } from '../hooks/useGenerateQuestions'
import { ExamsGeneratedSection } from '../components/ExamsGeneratedSection'

export function Root () {
  const { formGenerateQuestions, goToExam, loader } = useGenerateQuestion()
  return (
    <main>
      {loader && <LoadingScreen />}
      <header>
        <h1 className="text-7xl font-black">
          Practica generando generando tus examnes.
        </h1>
        <p className="text-4xl my-4">
          Genera tus exames a partir de un tema en especifico o de tus notas
          personales.
        </p>
      </header>
      <section className='grid grid-cols-[0.7fr,0.3fr] gap-6 py-4'>
        <form
          className="flex flex-col"
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
            />
          </div>
          <label className="col-span-2 row-span-2 relative">
            <span className="font-black text-2xl font-Satoshi block my-2">
              Apuntes
            </span>
            <textarea
              name="notes"
              rows="15"
              className="inputs resize-none"
            ></textarea>
          </label>
          <footer className="flex gap-4 my-4">
            <Button text={'Generar Preguntas'} type={'submit'} />
            <Button text={'Generar Examen'} handleClick={goToExam} />
          </footer>
        </form>
        <ExamsGeneratedSection/>
      </section>
    </main>
  )
}
