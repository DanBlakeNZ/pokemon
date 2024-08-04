import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  hideLabel?: boolean
}

function Input({ label, type, placeholder, value, onChange, hideLabel }: InputProps) {
  // TODO: add some error handling styles.
  return (
    <div className="flex flex-col w-full mb-2">
      <label className={`pb-1 mr-2 text-pokemon-dark-blue font-bold ${hideLabel && 'hidden'}`}>{label}:</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        className="w-auto border-2 border-pokemon-dark-blue text-pokemon-dark-blue rounded px-2 py-1"
        onChange={onChange}
      />
    </div>
  )
}

export default Input
