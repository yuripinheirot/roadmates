import { InputControlled } from '@/components/controlled/input.controlled'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form'
import { EstimateFormSchema, EstimateFormSchemaType } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { SelectControlled } from '@/components/controlled/select.controlled'
import { customerController } from '@/api/controllers/customers/customer.controller'
import { useQuery } from '@tanstack/react-query'

type EstimateFormProps = {
  onSubmit: SubmitHandler<EstimateFormSchemaType>
}

export const EstimateForm = ({ onSubmit }: EstimateFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<EstimateFormSchemaType>({
    resolver: zodResolver(EstimateFormSchema),
  })

  const { data: customers, isLoading: isLoadingCustomers } = useQuery({
    queryKey: ['customers'],
    queryFn: () => customerController.findAll(),
  })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-4'
    >
      <SelectControlled
        label='Cliente'
        data={customers || []}
        control={control}
        name='customer_id'
        placeholder='Selecione um cliente'
        isLoading={isLoadingCustomers}
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
