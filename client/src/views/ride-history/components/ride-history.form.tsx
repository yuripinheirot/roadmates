import { customerController } from '@/api/controllers/customers/customer.controller'
import { SelectControlled } from '@/components/controlled/select.controlled'
import { useQuery } from '@tanstack/react-query'
import {
  FieldError,
  FieldValues,
  SubmitHandler,
  useFormContext,
} from 'react-hook-form'

type Props = {
  onSubmit: SubmitHandler<FieldValues>
  children: React.ReactNode
}

export const RideHistoryForm = ({ children, onSubmit }: Props) => {
  const {
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
      <SelectControlled
        label='Motorista'
        data={customers || []}
        control={control}
        name='driver_id'
        placeholder='Selecione um motorista'
        isLoading={isLoadingCustomers}
        error={errors.customer_id as FieldError}
      />
      {children}
    </form>
  )
}
