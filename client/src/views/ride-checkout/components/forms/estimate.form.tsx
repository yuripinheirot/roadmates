import { InputControlled } from '@/components/controlled/input.controlled'
import { FieldError, FieldValues, useFormContext } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form'
import { SelectControlled } from '@/components/controlled/select.controlled'
import { customerController } from '@/api/controllers/customers/customer.controller'
import { useQuery } from '@tanstack/react-query'

type EstimateFormProps = {
  onSubmit: SubmitHandler<FieldValues>
  children: React.ReactNode
}

export const EstimateForm = ({ onSubmit, children }: EstimateFormProps) => {
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

  const customersFormatted = customers?.map((customer) => ({
    key: customer.id,
    value: customer.name,
  }))

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-4'
    >
      <SelectControlled
        label='Cliente'
        data={customersFormatted || []}
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
      {children}
    </form>
  )
}
