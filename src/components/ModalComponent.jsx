import { useEffect, useRef } from 'react'
import { Button } from './Buttons'

export function ModalComponent ({ title, amount, removeItem, goBack, id }) {
  const articleRef = useRef(null)
  const handleRemoveItem = () => {
    removeItem({ id })
    goBack()
  }

  const handleGoBack = () => {
    articleRef.current.classList.toggle('animation-modal-close')
    goBack()
  }

  // execute the function when keydown event is triggered
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleGoBack()
      } else if (e.key === 'Enter') {
        handleRemoveItem({ id })
      }
    }
    document.body.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.removeEventListener('keydown', handleKeyDown)
    }
  })

  return (
    <div className="absolute top-0 left-0 h-screen w-screen bg-black bg-opacity-60 grid place-content-center z-10 text-chicago-950">
      <article ref={articleRef} className="h-auto w-[420px] bg-chicago-100 px-4 py-7 rounded -z-20 relative animation-modal">
        <h2 className="text-2xl font-black">
          Esta seguro que desea borrar el examen de{' '}
          <span className="italic text-chicago-500 ">{title}?</span>
        </h2>
        <p className="font-semibold mt-2">
          Esta apunto de eliminar el examen de{' '}
          <span className="italic text-chicago-500 font-bold font-Satoshi text-lg ">
            {title}
          </span>{' '}
          con una cantidad{' '}
          <span className="italic text-chicago-500 font-bold font-Satoshi text-lg ">
            {amount}{' '}
          </span>
          preguntas.
        </p>
        <p className="font-semibold mt-2">Esta seguro que desea eliminarlo:</p>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <Button
          handleClick={handleRemoveItem}
            text={'Eliminar'}
            tailwindStyles={'bg-red-600 hover:bg-red-900 text-chicago-50 text-left'}
          />
          <Button
          handleClick={handleGoBack}
            text={'Volver atras'}
            tailwindStyles={'bg-chicago-600 hover:bg-chicago-900 text-chicago-50 text-left'}
          />
        </div>
      </article>
    </div>
  )
}
