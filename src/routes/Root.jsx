export function Root () {
  return (
    <main className='text-center'>
      <header>
        <h1 className='text-7xl font-black'>Student Focus Place</h1>
      </header>
      <nav className='w-full flex justify-center gap-5 my-3 text-left'>
        <LinkComponent link='/exam-generator' title={'Generador de examenes'} />
        <LinkComponent title={'Revision de flashcards'} />

      </nav>
    </main>
  )
}

export function LinkComponent ({ link = '#', text, title }) {
  return (
    <a href={link}>
      <div className='bg-chicago-950 text-white w-72 h-72 rounded px-4 py-2'>
        <h3 className='text-xl font-black'>{title}</h3>
        <p className='text-xl'></p>
      </div>
    </a>
  )
}
