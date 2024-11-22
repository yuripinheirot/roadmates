import React from 'react'

type LabelInputProps = {
  label: string
}

export const LabelInput = ({ label }: LabelInputProps) => {
  return <label className='text-sm font-medium text-gray-700'>{label}</label>
}
