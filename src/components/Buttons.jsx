export function Button ({ handleClick = null, text, type }) {
  return (
    <button
      className="bg-chicago-300 text-center px-7 py-4 rounded-lg hover:bg-chicago-500 hover:text-chicago-100 font-Satoshi transition-colors"
      type={type ?? 'button'}
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
