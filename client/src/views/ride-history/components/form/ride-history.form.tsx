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
import { useSearchParams } from 'react-router'

type Props = {
  onSubmit: SubmitHandler<FieldValues>
  children: React.ReactNode
}

export const RideHistoryForm = ({ children, onSubmit }: Props) => {
  const [searchParams] = useSearchParams()
  const customer_id = searchParams.get('customer_id')
  const driver_id = searchParams.get('driver_id')

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
        key: d.id.toString(),
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
        defaultValue={customer_id || ''}
      />
      <SelectControlled
        label='Motorista'
        data={driversFormated || []}
        control={control}
        name='driver_id'
        placeholder='Selecione um motorista'
        isLoading={isLoadingDrivers}
        error={errors.driver_id as FieldError}
        optionAll={true}
        defaultValue={driver_id || '*'}
      />
      {children}
    </form>
  )
}
