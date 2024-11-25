import { customerController } from '@/api/controllers/customers/customer.controller'
import { driversController } from '@/api/controllers/drivers/drivers.controller'
import { SelectControlled } from '@/components/controlled/select.controlled'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
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

  const { data: drivers, isLoading: isLoadingDrivers } = useQuery({
    queryKey: ['drivers'],
    queryFn: () => driversController.findAll(),
  })

  const driversFormated = useMemo(
    () =>
      drivers?.map((d) => ({
        key: d.id,
        value: `${d.name} - ${d.vehicle}`,
      })),
    [drivers]
  )

  const customersFormated = useMemo(
    () =>
      customers?.map((c) => ({
        key: c.id,
        value: c.name,
      })),
    [customers]
  )

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-4'
    >
      <SelectControlled
        label='Cliente'
        data={customersFormated || []}
        control={control}
        name='customer_id'
        placeholder='Selecione um cliente'
        isLoading={isLoadingCustomers}
        error={errors.customer_id as FieldError}
      />
      <SelectControlled
        label='Motorista'
        data={driversFormated || []}
        control={control}
        name='driver_id'
        placeholder='Selecione um motorista'
        isLoading={isLoadingDrivers}
        error={errors.customer_id as FieldError}
      />
      {children}
    </form>
  )
}
