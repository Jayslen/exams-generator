import { ANIMATION_TIME } from '../utils/all-constanst'
import { animationBtn } from '../utils/animation-button'

export function Button ({
  text,
  handleClick = null,
  type = 'button',
  isDisabled = false,
  tailwindStyles = null,
  hasAnimation = true
}) {
  return (
    <button
      style={{ '--hover-color': '#282624' }}
      className={`py-3 px-5 rounded font-Satoshi transition-all duration-300 border overflow-hidden hover:text-chicago-100 relative disabled:cursor-not-allowed disabled:bg-chicago-200 disabled:hover:text-current ${tailwindStyles} ${hasAnimation ? 'hover-animation' : 'bg-chicago-300 hover:bg-chicago-600'}`}
      type={type}
      disabled={isDisabled}
      onClick={(e) => {
        animationBtn(e)
        setTimeout(() => {
          handleClick && handleClick()
        }, ANIMATION_TIME + 50)
      }}
    >
      {text}
    </button>
  )
}
