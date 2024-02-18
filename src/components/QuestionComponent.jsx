export function QuestionComponent ({ title, type, placeholder, name, obligatory }) {
  return (
    <label className="font-Satoshi text-4x flex flex-col">
      <span className="font-black text-2xl font-Satoshi my-2">{title}</span>
      <input
        type={type}
        placeholder={placeholder}
        required={obligatory}
        name={name}
        max={type === 'number' && 15}
        min={type === 'number' && 1}
        className="inputs"
      />
    </label>
  )
}
