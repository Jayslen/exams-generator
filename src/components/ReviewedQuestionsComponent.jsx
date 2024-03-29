import { CheckIcon, XIcon } from '../assets/Icons'

export function ReviewedQuestions ({ questionData }) {
  const {
    question,
    options,
    isCorrect,
    userAnswer,
    correctAnswer = null
  } = questionData

  return (
    <li className="list-none mb-4 p-6 bg-chicago-200 hover:bg-chicago-950 hover:text-white rounded cursor-pointer transition-colors duration-300 group relative">
      <h2 className="font-extrabold text-3xl text-pretty my-1 group-hover:text-chicago-100 ">
        {question}
      </h2>
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
        className={`absolute top-3 right-1 flex flex-col h-96 group-hover:text-white ${isCorrect ? 'text-green-600' : 'text-red-600'}`}
      >
        {isCorrect && <CheckIcon width={35} height={35} />}
        {!isCorrect && <XIcon width={35} height={35} />}
        <p className="absolute top-16 rotate-90 -right-4">
          {isCorrect ? 'Correcta' : 'Incorecta'}
        </p>
      </div>
      {/* add a accordeon to show the correct answer */}
    </li>
  )
}
