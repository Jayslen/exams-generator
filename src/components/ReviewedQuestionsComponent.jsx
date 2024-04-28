import { toast } from 'react-toastify'
import { CheckIcon, XIcon } from '../assets/Icons'
import { useId } from 'react'

export function ReviewedQuestions ({ questionData, databaseQuestions }) {
  const { question, options, isCorrect, userAnswer, correctAnswer = null } = questionData
  const labelId = useId()

  const isQuestionInDatabase = databaseQuestions.some((value) => value.question === question)
  const handleClick = () => {
    if (isQuestionInDatabase) {
      toast.info('Esta pregunta ya existe en la base de datos')
    }
  }

  return (
    <div>
      <input
        type="checkbox"
        name={labelId}
        value={JSON.stringify({ question, correctAnswer })}
        disabled={isQuestionInDatabase}
        id={labelId}
        className="peer hidden"
      />
      <label
        htmlFor={labelId}
        className="block list-none mb-4 p-6 shadow-xl hover:bg-chicago-700 hover:text-white rounded cursor-pointer transition-colors duration-300 group relative peer-checked:bg-chicago-950 peer-checked:text-chicago-50"
        onClick={handleClick}
      >
        <h2 className="font-extrabold text-3xl text-pretty my-1 group-hover:text-chicago-100"> {question}</h2>
        <ul className="ml-9">
          {options.map((option, index) => {
            return (
              <li
                className={`list-disc text-lg my-1.5 after:content-['.'] ${option === correctAnswer ? 'group-hover:text-green-400 text-green-600' : null} ${!isCorrect && option === userAnswer ? 'group-hover:text-red-400 text-red-600' : null}`}
                key={index}
              >
                {option}
              </li>
            )
          })}
        </ul>
        <div
          className={`absolute top-3 right-1 flex flex-col items-center h-96 group-hover:text-white ${isCorrect ? 'text-green-600' : 'text-red-600'}`}
        >
          {isCorrect && <CheckIcon width={25} height={25} />}
          {!isCorrect && <XIcon width={25} height={25} />}
          <p className="absolute top-12 rotate-90 text-sm">
            {isCorrect ? 'Correcta' : 'Incorecta'}
          </p>
        </div>
        {/* add a accordeon to show the correct answer */}
        {isQuestionInDatabase && <p className='absolute bottom-8 right-6 font-Satoshi'>Pregunta ya en la base de datos.</p>}
      </label>
    </div>
  )
}
