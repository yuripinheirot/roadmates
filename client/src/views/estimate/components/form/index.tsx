import { InputControlled } from '@/components/controlled/input.controlled'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form'
import { EstimateFormSchema, EstimateFormSchemaType } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { CustomerModel } from '@/models/customer.model'
import { SelectControlled } from '../customer-select'

type EstimateFormProps = {
  onSubmit: SubmitHandler<EstimateFormSchemaType>
  data: {
    customers: CustomerModel[]
  }
}

export const EstimateForm = ({ onSubmit, data }: EstimateFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<EstimateFormSchemaType>({
    resolver: zodResolver(EstimateFormSchema),
  })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-4'
    >
      <SelectControlled
        label='Cliente'
        data={data.customers}
        control={control}
        name='customer_id'
        placeholder='Selecione um cliente'
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
