import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'
import { cn } from '@/lib/utils'

const typographyVariants = cva('text-black', {
  variants: {
    variant: {
      header1: 'text-2xl',
      header2: 'text-xl',
      header3: 'text-lg',
      body1: 'text-base',
      body2: 'text-sm',
      body3: 'text-xs',
    },
    weight: {
      thin: 'font-thin',
      light: 'font-light',
      regular: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    fontColor: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      muted: 'text-muted-foreground',
      error: 'text-red-500',
    },
  },
  defaultVariants: {
    variant: 'body1',
    weight: 'regular',
    fontColor: 'primary',
  },
})

export interface TypographyProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof typographyVariants> {}

export const Typography = React.forwardRef<HTMLDivElement, TypographyProps>(
  ({ className, variant, weight, fontColor, ...props }, ref) => {
    return (
      <span
        className={cn(
          typographyVariants({ variant, weight, fontColor, className })
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
