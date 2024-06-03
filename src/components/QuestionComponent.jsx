import { useId } from 'react'
import { CheckIcon, XIcon } from '../assets/Icons'

const questionSelected = ['A', 'B', 'C', 'D']

export function QuestionComponent ({
  isChecked,
  index,
  value,
  currentAnswer,
  CURRENT_QUESTION,
  CURRENT_ANSWER_IS_CORRECT,
  CURRENT_ANSWER_IS_WRONG
}) {
  const radioBtnId = useId()

  return (
    <div className="relative flex items-center w-full">
      <input
        type="radio"
        name="userAnswer"
        disabled={isChecked}
        id={radioBtnId}
        value={value}
        className='peer hidden'
      />
      <label
        style={{
          backgroundColor:
            CURRENT_ANSWER_IS_CORRECT && currentAnswer === value
              ? 'rgb(34, 197, 94)'
              : CURRENT_ANSWER_IS_WRONG && currentAnswer === value
                ? 'rgb(239, 69, 68)'
                : typeof currentAnswer === 'string' &&
                    currentAnswer !== value &&
                    value === CURRENT_QUESTION.correctAnswer
                  ? 'rgb(34, 197, 94)'
                  : null,
          borderColor:
            (CURRENT_ANSWER_IS_CORRECT || CURRENT_ANSWER_IS_WRONG) &&
            (value === currentAnswer ||
              value === CURRENT_QUESTION.correctAnswer)
              ? 'transparent'
              : 'currentcolor'
        }}
        className="flex items-center gap-3 border-[0.5px] peer-checked:bg-chicago-700 peer-checked:text-chicago-100 px-4 py-4 border-chicago-950 peer-checked:border-none rounded-full w-full font-Sans text-black text-md transition-colors duration-500 cursor-pointer"
        htmlFor={radioBtnId}
      >
        <span className="place-content-center grid bg-chicago-300 rounded-full w-12 h-12 aspect-square">
          {questionSelected[index]}
        </span>

        <span>{value}</span>
      </label>

      {currentAnswer && value === CURRENT_QUESTION.correctAnswer && (
        <div className="-right-10 absolute">
          <CheckIcon />
        </div>
      )}
      {CURRENT_ANSWER_IS_WRONG && currentAnswer === value && (
        <div className="-right-10 absolute">
          <XIcon />
        </div>
      )}
    </div>
  )
}
