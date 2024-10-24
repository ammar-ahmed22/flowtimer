import React from 'react'

export type FieldProps = {
  label: string
  children: React.ReactNode
  className?: string
}

const Field: React.FC<FieldProps> = ({ label, children, className }) => {
  return (
    <div className={`flex justify-between ${className ?? ''}`}>
      <p className='text-default-500 font-bold'>{label}</p>
      {children}
    </div>
  )
}

export default Field
