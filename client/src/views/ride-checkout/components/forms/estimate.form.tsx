import { InputControlled } from '@/components/controlled/input.controlled'
import { Button } from '@/components/ui/button'
import { FieldError, FieldValues, useFormContext } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form'
import { SelectControlled } from '@/components/controlled/select.controlled'
import { customerController } from '@/api/controllers/customers/customer.controller'
import { useQuery } from '@tanstack/react-query'

type EstimateFormProps = {
  onSubmit: SubmitHandler<FieldValues>
  isLoading: boolean
}

export const EstimateForm = ({ onSubmit, isLoading }: EstimateFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useFormContext()

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
        error={errors.customer_id as FieldError}
      />
      <InputControlled
        label='Origem'
        register={register}
        name='origin'
        required
        error={errors.origin as FieldError}
      />
      <InputControlled
        label='Destino'
        register={register}
        name='destination'
        required
        error={errors.destination as FieldError}
      />

      <Button
        type='submit'
        isLoading={isLoading}
        disabled={isLoading}
        variant={'outline'}
      >
        buscar rota
      </Button>
    </form>
  )
}
