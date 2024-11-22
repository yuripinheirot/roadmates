import { Input } from '../ui/input'
import { UseFormRegister, FieldValues, FieldError } from 'react-hook-form'
import { Typography } from '../ui/typography'

type Props = {
  register: UseFormRegister<any>
  name: string
  required?: boolean
  error?: FieldError
} & React.ComponentProps<'input'>

export const InputControlled = ({
  register,
  name,
  required,
  error,
  ...props
}: Props) => {
  return (
    <div className='flex flex-col gap-2'>
      <Input
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
