export function LinkComponent ({ text, linkTo = '#' }) {
  return (
    <a
      href={linkTo}
      className={`rounded italic font-medium block underline cursor-pointer transition-colors ${linkTo === '#' ? 'cursor-not-allowed text-chicago-300 hover:text-red-500' : 'text-chicago-950 hover:text-chicago-500'}`}
    >
      {text}
    </a>
  )
}
