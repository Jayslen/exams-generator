import { LoadingIcon } from '../assets/Icons'

export function LoadingScreen () {
  return (
    <div className="h-screen w-screen absolute top-0 left-0 z-20 bg-black bg-opacity-75 grid place-content-center">
      <LoadingIcon />
      <span className="text-chicago-50 font-Satoshi text-xl text-center animate-pulse">
        Generando Preguntas...
      </span>
    </div>
  )
}
