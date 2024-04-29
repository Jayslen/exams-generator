import { useEffect, useState } from 'react'
import { fetchNotionFlashCards } from '../services/notionDBServices'
import { toast } from 'react-toastify'

export function Root () {
  const [flashCards, setFlashCards] = useState(null)
  const flashcardLinkExists = flashCards?.length > 0
  useEffect(() => {
    fetchNotionFlashCards().then((data) => {
      setFlashCards(data)
    })
  }, [])

  return (
    <main className='h-screen grid place-content-center text-center'>
      <header>
        <h1 className='text-4xl font-black md:text-5xl lg:text-7xl xl:text-8xl'>Student Focus Place</h1>
        <p className='text-sm md:mx-16 lg:mx-32 xl:mx-52 md:text-lg'>Elige entre crear examnes para estudiar, o practicar los que ya has generado. Tanto como poder estudiar las preguntas en estilo flashcard que has guardado</p>
      </header>
      <nav className='w-full flex flex-col justify-center gap-5 my-3 text-left md:flex-row'>
        <LinkComponent title={'Examenes'} link='/exam-generator' />
        <LinkComponent title={'Flashcards'} link={flashcardLinkExists ? '/flashcard' : '#'} handleClick={() => {
          if (!flashcardLinkExists) {
            toast.warn(!flashCards ? 'Cargando flashcards, por favor espera' : flashCards.length === 0 ? 'No hay flashcards disponibles' : 'Error al cargar flashcards')
          }
        }} />
      </nav>
    </main>
  )
}

export function LinkComponent ({ link = '#', title, handleClick }) {
  return (
    <a href={link} className='text-chicago-900 border border-chicago-950 rounded py-4 px-4 xl:px-10 font-black text-xl font-Satoshi relative group hover:text-chicago-50 transition-colors duration-300' onClick={handleClick}>
      {title}
      <div className='bg-chicago-950 w-full h-1 absolute bottom-0 right-0 -z-10 group-hover:h-full transition-all duration-500'></div>
    </a>
  )
}
