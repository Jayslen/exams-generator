import { useEffect, useRef } from 'react'
import { Button } from './Buttons'
import { ANIMATION_TIME } from '../utils/all-constanst'

export function ModalComponent ({
  title,
  firstText,
  secondText,
  confirmBtnText,
  declineBtnText,
  confirmBtnAction,
  declineBtnAction = () => {},
  closeModal
}) {
  const articleRef = useRef(null)

  const confirmAction = () => {
    articleRef.current.classList.toggle('animation-modal-close')
    setTimeout(() => {
      closeModal()
      confirmBtnAction()
    }, ANIMATION_TIME)
  }

  const declineAction = () => {
    articleRef.current.classList.toggle('animation-modal-close')
    setTimeout(() => {
      closeModal()
      declineBtnAction()
    }, ANIMATION_TIME)
  }

  // execute the function when keydown event is triggered
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        confirmAction()
      } else if (e.key === 'Enter') {
        declineAction()
      }
    }
    document.body.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.removeEventListener('keydown', handleKeyDown)
    }
  })

  return (
    <div className="absolute top-0 left-0 h-screen w-screen bg-black bg-opacity-60 grid place-content-center z-10 text-chicago-950">
      <article
        ref={articleRef}
        className="h-auto w-[420px] bg-chicago-100 px-4 py-7 rounded -z-20 relative animation-modal"
      >
        <h2 className="text-2xl font-black">{title}</h2>
        {firstText && <p>{firstText}</p>}
        {secondText && <p>{secondText}</p>}
        <div className="grid grid-cols-2 gap-2 mt-2">
          <Button
            handleClick={declineAction}
            text={declineBtnText}
            tailwindStyles={
              'bg-red-600 hover:bg-red-900 text-chicago-50 text-left'
            }
            hasAnimation={false}
          />
            <Button
              handleClick={confirmAction}
              text={confirmBtnText}
              tailwindStyles={
                'bg-chicago-600 hover:bg-chicago-900 text-chicago-50 text-left'
              }
              hasAnimation={false}
            />
        </div>
      </article>
    </div>
  )
}
