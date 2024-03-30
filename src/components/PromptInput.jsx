export function PromptInput ({ title, type, placeholder, name, obligatory }) {
  return (
      <label className="font-Satoshi flex flex-col">
        <span className="font-black text-xl lg:text-2xl">{title}</span>
        <input
          type={type}
          placeholder={placeholder}
          required={obligatory}
          name={name}
          max={type === 'number' ? 20 : undefined}
          min={type === 'number' ? 1 : undefined}
          className="inputs"
        />
        </label>
  )
}
