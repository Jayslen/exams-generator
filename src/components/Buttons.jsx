export function Button ({ handleClick = null, text, type = 'button', tailwindStyles = null }) {
  return (
    <button
      className={`py-4 px-5 rounded font-Satoshi transition-colors ${tailwindStyles || 'bg-chicago-300 hover:bg-chicago-500 hover:text-chicago-100 '}`}
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
