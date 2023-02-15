import React from 'react'

const FormSidebar = ({title,tag}) => {
  return (
    <div  className='rounded max-height bg-primary-blue flex-col gap-4 h-1/5 w-4/5 px-9 py-10' >
        <h1 className='rounded font-medium text-white text-2xl'>{title}</h1>
        <p className='rounded text-gray-200 text-lg pr-2'>{tag}</p>
    </div>
  )
}

export default FormSidebar
