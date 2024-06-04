import { Button } from './Buttons'

export function DetailsComponent () {
  return (
    <>
      <details className="w-[300px] mb-4 border border-black rounded group">
        <summary className="text-xl p-3 font-black font-Satoshi group-open:text-s border-b group-open:border-black select-none">
          Subir las preguntas a la base de datos.
        </summary>
        <div className="p-3">
          <label htmlFor="subject" className="font-bold text-lg">
            Ingrese el nombre de la materia
          </label>
          <p>
            Seleccione las preguntas a subir y escriba el nombre de la materia.
          </p>
          <input
            type="text"
            name="subject"
            id="subject"
            placeholder="Programacion..."
            className="w-full px-4 py-1.5 my-2 rounded bg-white ring-1 ring-[#a19c96] focus:outline-none focus:ring-2 focus:ring-[#8e8781] focus:border-transparent transition duration-500 ease-in-out hover:shadow-lg"
          />
          <footer>
            <Button
              text={'Enviar'}
              type="submit"
              tailwindStyles={'w-full'}
            />
            <div className='grid grid-cols-2 gap-2 mt-2'>
            <Button text={'Todas'} tailwindStyles={'w-full'} handleClick={() => {
              const $inputs = Array.from(document.querySelectorAll('input[type="checkbox"]'))
              $inputs.forEach(($elm) => {
                if (!$elm.disabled) {
                  $elm.checked = true
                }
              })
            }}/>

            <Button
              text={'Quitar'}
              tailwindStyles={'w-full'}
              handleClick={() => {
                const $inputs = Array.from(document.querySelectorAll('input[type="checkbox"]'))
                $inputs.forEach(($elm) => {
                  $elm.checked = false
                })
              }}
            />
            </div>
          </footer>
        </div>
      </details>
    </>
  )
}
