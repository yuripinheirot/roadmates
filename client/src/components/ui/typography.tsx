import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'
import { cn } from '@/lib/utils'

const typographyVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        header1: 'text-4xl',
        header2: 'text-3xl',
        header3: 'text-2xl',
        body1: 'text-base',
        body2: 'text-sm',
        body3: 'text-xs',
      },
      weight: {
        thin: 'font-thin',
        light: 'font-light',
        regular: 'font-normal',
        medium: 'font-medium',
        bold: 'font-bold',
      },
    },
    defaultVariants: {
      variant: 'body1',
      weight: 'regular',
    },
  }
)

export interface TypographyProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof typographyVariants> {}

export const Typography = React.forwardRef<HTMLDivElement, TypographyProps>(
  ({ className, variant, weight, ...props }, ref) => {
    return (
      <span
        className={cn(typographyVariants({ variant, weight, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
