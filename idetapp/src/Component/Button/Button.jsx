import React from 'react'

export default function Button({
  buttonLabel,
  type = "button", // Default to "button" if not specified
}) {
  return (
    <div className='package-card-wrapper rounded-lg w-full md:w-auto lg:w-full p-2 flex flex-col'>
      <button 
        type={type}  // Ensure the button type is correctly passed
        className='hover:scale-110 hover:bg-black rounded-lg bg-slate-600 px-4 py-2 text-sm text-white h-[36px]'>
        {buttonLabel}
      </button>
    </div>
  )
}
