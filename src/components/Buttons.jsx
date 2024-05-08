import { animationBtn } from '../scripts/animation-button'

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
      className={`z-20 py-3 px-5 rounded font-Satoshi transition-colors duration-300 overflow-hidden hover:text-chicago-100 relative ${tailwindStyles} ${hasAnimation && 'hover-animation'}`}
      type={type}
      disabled={isDisabled}
      onClick={(e) => {
        animationBtn(e)
        handleClick && handleClick()
      }}
    >
      {text}
    </button>
  )
}
