import { Input } from '../ui/input'
import { UseFormRegister, FieldValues, FieldError } from 'react-hook-form'
import { Typography } from '../ui/typography'

type Props = {
  register: UseFormRegister<any>
  name: string
  required?: boolean
  error?: FieldError
  label?: string
} & React.ComponentProps<'input'>

export const InputControlled = ({
  register,
  name,
  required,
  error,
  label,
  ...props
}: Props) => {
  return (
    <div className='flex flex-col gap-2'>
      <Input
        label={label}
        {...register(name, { required })}
        {...props}
      />
      {error && (
        <Typography
          variant={'body3'}
          className='text-red-500'
        >
          {error.message}
        </Typography>
      )}
    </div>
  )
}
