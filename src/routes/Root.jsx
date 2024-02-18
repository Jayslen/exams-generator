import { FullScreenIcon } from '../assets/FullScreenIcon'
import { QuestionComponent } from '../components/QuestionComponent'

export function Root () {
  return (
    <main>
      <h1 className="text-7xl font-black">
        Practica generando generando tus examnes.
      </h1>
      <p className="text-4xl my-4">
        Genera tus exames a partir de un tema en especifico o de tus notas
        personales.
      </p>
      <form className="my-4 flex flex-col w-3/4">
        <div className="grid grid-cols-[0.7fr,0.4fr] gap-3">
          <QuestionComponent type={'text'} title={'Titulo'} placeholder={'Opcional'} name={'title'}/>
          <QuestionComponent type={'number'} title={'Cantidad de preguntas'} placeholder={'10'} name={'amount'} obligatory={true}/>
        </div>
        <label className="col-span-2 row-span-2 relative">
          <div className='absolute bottom-4 right-3'>{<FullScreenIcon/>}</div>
          <span className='font-black text-2xl font-Satoshi block my-2'>Notas</span>
          <textarea
            name="notes"
            rows="15"
            className="inputs resize-none"
          ></textarea>
        </label>
        <button className='bg-[#8A2BE2] text-white self-start rounded-md px-8 py-4'>Generar Examen</button>
      </form>
    </main>
  )
}
