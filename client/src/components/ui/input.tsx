import * as React from 'react'

import { cn } from '@/lib/utils'

type Props = React.ComponentProps<'input'> & {
  label?: string
}

const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ className, type, label, ...props }, ref) => {
    return (
      <div className='flex flex-col'>
        {label && (
          <label className='text-sm font-medium text-gray-700'>{label}</label>
        )}
        <input
          type={type}
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
