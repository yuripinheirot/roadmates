import { Button } from '@/components/ui/button'
import { RideHistoryForm } from './components/form/ride-history.form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import {
  HistoryFormSchema,
  HistoryFormSchemaType,
} from './components/form/schema'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { RidesCards } from './components/rides-cards'
import { ridesController } from '@/api/controllers/rides/rides.controller'
import { AxiosError } from 'axios'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { toast } from '@/hooks/use-toast'

export const RideHistoryView = () => {
  const [searchParams] = useSearchParams()
  const queryClient = useQueryClient()

  const formMethods = useForm<HistoryFormSchemaType>({
    resolver: zodResolver(HistoryFormSchema),
    defaultValues: {
      driver_id: '*',
    },
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
          toast({
            title: 'Info!',
            description: 'Nenhum dado foi encontrado',
          })
          return { rides: [] }
        }
        throw error
      }
    },
    enabled: false,
  })

  const loadParams = () => {
    const customer_id = searchParams.get('customer_id')
    const driver_id = searchParams.get('driver_id')

    if (customer_id && driver_id) {
      formMethods.setValue('customer_id', customer_id)
      formMethods.setValue('driver_id', driver_id)
      fetchRides()
    }
  }

  useEffect(() => {
    loadParams()
  }, [])

  useEffect(() => {
    return () => {
      queryClient.clear()
    }
  }, [])

  return (
    <FormProvider {...formMethods}>
      <section className='flex flex-col gap-4'>
        <RideHistoryForm onSubmit={fetchRides}>
          <Button type='submit'>Buscar</Button>
        </RideHistoryForm>
        <RidesCards data={rides?.rides} />
      </section>
    </FormProvider>
  )
}
