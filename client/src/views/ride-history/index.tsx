import { Button } from '@/components/ui/button'
import { RideHistoryForm } from './components/form/ride-history.form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import {
  HistoryFormSchema,
  HistoryFormSchemaType,
} from './components/form/schema'
import { useQuery } from '@tanstack/react-query'
import { RidesCards } from './components/rides-cards'
import { ridesController } from '@/api/controllers/rides/rides.controller'

export const RideHistoryView = () => {
  const formMethods = useForm<HistoryFormSchemaType>({
    resolver: zodResolver(HistoryFormSchema),
  })

  const {
    data: rides,
    isLoading: isLoadingRides,
    refetch: fetchRides,
  } = useQuery({
    queryKey: [
      `riders-${formMethods.getValues().customer_id}-${
        formMethods.getValues().driver_id
      }`,
    ],
    queryFn: () =>
      ridesController.list({
        customer_id: formMethods.getValues().customer_id,
        driver_id: formMethods.getValues().driver_id,
      }),
    enabled: false,
  })

  return (
    <FormProvider {...formMethods}>
      <RideHistoryForm onSubmit={fetchRides}>
        <Button>Buscar</Button>
      </RideHistoryForm>
      <RidesCards data={rides || []} />
    </FormProvider>
  )
}
