// TODO: Different button variations

import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

function Button({ children, type = 'button', disabled = false, onClick }: ButtonProps) {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`${
        disabled
          ? 'bg-slate-400 text-slate-800 cursor-not-allowed'
          : 'bg-pokemon-dark-blue text-pokemon-yellow border-pokemon-yellow cursor-pointer hover:bg-pokemon-blue hover:scale-105'
      } font-bold py-2 px-4 border  rounded relative w-full flex justify-center items-center ease-in duration-50 drop-shadow-md`}
    >
      {children}
    </button>
  )
}

export default Button
