import React from 'react'

const FormSidebar = ({title,tag}) => {
  return (
    <div className='bg-primary-blue sm:flex flex-col gap-4 w-2/5 px-9 py-10' >
        <h1 className='font-medium text-white text-2xl'>{title}</h1>
        <p className='text-gray-200 text-lg pr-2'>{tag}</p>
    </div>
  )
}

export default FormSidebar
