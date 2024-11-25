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
import { AxiosError } from 'axios'

export const RideHistoryView = () => {
  const formMethods = useForm<HistoryFormSchemaType>({
    resolver: zodResolver(HistoryFormSchema),
  })

  const { data: rides, refetch: fetchRides } = useQuery({
    queryKey: ['rides'],
    queryFn: async () => {
      try {
        return await ridesController.list({
          customer_id: formMethods.getValues().customer_id,
          driver_id: formMethods.getValues().driver_id,
        })
      } catch (error: unknown) {
        if (error instanceof AxiosError && error?.response?.status === 404) {
          return { rides: [] }
        }
        throw error
      }
    },
    enabled: false,
  })

  return (
    <FormProvider {...formMethods}>
      <section className='flex flex-col gap-4'>
        <RideHistoryForm onSubmit={fetchRides}>
          <Button>Buscar</Button>
        </RideHistoryForm>
        <RidesCards data={rides?.rides || []} />
      </section>
    </FormProvider>
  )
}
