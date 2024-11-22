import React from 'react'
import { cn } from '@/lib/utils'

type LabelInputProps = {
  label: string
  className?: string
}

export const LabelInput = ({ label, className }: LabelInputProps) => {
  return (
    <label className={cn('text-sm font-medium text-gray-700', className)}>
      {label}
    </label>
  )
}
