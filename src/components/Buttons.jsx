export function Button ({ handleClick = null, text, type }) {
  return (
    <button
      className="bg-chicago-300 text-center px-7 py-4 rounded-lg hover:bg-chicago-400 font-Satoshi transition-colors"
      type={type ?? 'button'}
      onClick={handleClick}
    >
      {text}
    </button>
  )
}
