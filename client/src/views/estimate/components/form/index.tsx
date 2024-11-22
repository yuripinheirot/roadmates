import { InputControlled } from '@/components/controlled/input.controlled'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form'
import { EstimateFormSchema, EstimateFormSchemaType } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'

type EstimateFormProps = {
  onSubmit: SubmitHandler<EstimateFormSchemaType>
}

export const EstimateForm = ({ onSubmit }: EstimateFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EstimateFormSchemaType>({
    resolver: zodResolver(EstimateFormSchema),
  })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-4'
    >
      <InputControlled
        label='Usuário'
        register={register}
        name='customer_id'
        required
        error={errors.customer_id}
      />
      <InputControlled
        label='Origem'
        register={register}
        name='origin'
        required
        error={errors.origin}
      />
      <InputControlled
        label='Destino'
        register={register}
        name='destination'
        required
        error={errors.destination}
      />
      <Button type='submit'>confirm</Button>
    </form>
  )
}
