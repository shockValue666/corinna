import React from 'react'

interface Props{
  label:string,
  message:string
}

const Section:React.FC<Props> = ({
  label,message
}) => {
  return (
    <div>
      <p className='text-sm font-medium'>{label}</p>
      <p className='text-sm font-light'>{message}</p>
    </div>
  )
}

export default Section