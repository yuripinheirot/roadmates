import { InputControlled } from '@/components/controlled/input.controlled'
import { Button } from '@/components/ui/button'
import { UseFormRegister } from 'react-hook-form'
import { UseFormHandleSubmit } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form'
import { FieldErrors } from 'react-hook-form'
import { EstimateFormSchemaType } from './schema'

type EstimateFormProps = {
  register: UseFormRegister<EstimateFormSchemaType>
  handleSubmit: UseFormHandleSubmit<EstimateFormSchemaType>
  errors: FieldErrors<EstimateFormSchemaType>
  onSubmit: SubmitHandler<EstimateFormSchemaType>
}

export const EstimateForm = ({
  register,
  handleSubmit,
  errors,
  onSubmit,
}: EstimateFormProps) => {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-4'
    >
      <InputControlled
        register={register}
        name='customer_id'
        required
        error={errors.customer_id}
      />
      <InputControlled
        register={register}
        name='origin'
        required
        error={errors.origin}
      />
      <InputControlled
        register={register}
        name='destination'
        required
        error={errors.destination}
      />
      <Button type='submit'>confirm</Button>
    </form>
  )
}
