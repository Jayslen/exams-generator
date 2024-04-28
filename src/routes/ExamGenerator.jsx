import 'react-toastify/dist/ReactToastify.css'
import { useGenerateQuestion } from '../hooks/useGenerateQuestions'
import { PromptInput } from '../components/PromptInput'
import { Button } from '../components/Buttons'
import { LoadingScreen } from '../components/LoadingScreen'
import { ExamsGeneratedSection } from '../components/ExamsGeneratedSection'

export function ExamGenerator () {
  const { formGenerateQuestions, goToExam, loader } = useGenerateQuestion()
  console.log()
  return (
    <main>
      {loader && <LoadingScreen />}
      <header>
        <h1 className="text-3xl text-balance font-black sm:text-4xl lg:text-5xl xl:text-6xl">
          Practica generando tus examenes de manera eficiente y rapida.
        </h1>
        <p className="text-xl my-4 sm:text-2xl lg:text-3xl xl:text-4xl">
          Genera tus exames a partir de un tema en especifico o de tus notas
          personales.
        </p>
      </header>
      <section className='grid md:grid-cols-[0.65fr,0.35fr] lg:grid-cols-[0.7fr,0.3fr] gap-6 py-4'>
        <form
          className="flex flex-col"
          onSubmit={formGenerateQuestions}
        >
          <div className="flex flex-col md:grid md:grid-cols-2 gap-3">
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
            <span className="font-black text-xl font-Satoshi block my-2 lg:text-2xl">
              Apuntes
            </span>
            <textarea
              name="notes"
              rows="15"
              className="inputs resize-none"
            ></textarea>
          </label>
          <footer className="flex flex-col md:flex-row gap-3 mt-4">
            <Button text={'Generar Preguntas'} type={'submit'} />
            <Button text={'Generar Examen'} handleClick={goToExam} />
          </footer>
        </form>
        <ExamsGeneratedSection/>
      </section>
    </main>
  )
}
