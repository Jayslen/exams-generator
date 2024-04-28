export function Button ({ handleClick = null, text, type = 'button', tailwindStyles = null }) {
  return (
    <button
      className={`py-3 px-5 rounded font-Satoshi transition-colors bg-chicago-300 hover:bg-chicago-500 hover:text-chicago-100 ${tailwindStyles}`}
      type={type}
      onClick={(e) => {
        e.target.classList.toggle('animationButton')

        setTimeout(() => {
          e.target.classList.toggle('animationButton')
        }, 300)
        handleClick && handleClick()
      }}
    >
      {text}
    </button>
  )
}
