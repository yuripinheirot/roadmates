import { useState } from 'react'
import { EstimateStep } from './components/steps/estimate/estimate.step'
import { Steps } from './types'
import { FormProvider, useForm } from 'react-hook-form'
import { EstimateFormSchemaType } from './components/forms/schema'
import { EstimateFormSchema } from './components/forms/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { ridesController } from '@/api/controllers/rides/rides.controller'
import { useMutation } from '@tanstack/react-query'
import { useToast } from '@/hooks/use-toast'
import { AxiosError } from 'axios'
import { DriversStep } from './components/steps/drivers/drivers.step'
import { DriverModel } from '@/domain/models/driver.model'
import { RideCheckoutContext } from './contexts/ride-checkout.context'

export const RideCheckoutView = () => {
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(0)

  const formMethods = useForm<EstimateFormSchemaType>({
    resolver: zodResolver(EstimateFormSchema),
  })

  const {
    mutateAsync: estimateRoute,
    data: estimatedRouteData,
    isPending: isLoadingEstimateRoute,
  } = useMutation({
    mutationFn: (data: EstimateFormSchemaType) =>
      ridesController.estimate(data),
    onError: (error) => {
      if (error instanceof AxiosError && error.response?.status === 404) {
        toast({
          title: 'Rota não encontrada',
          variant: 'destructive',
        })
        return
      }

      toast({
        title: 'Erro ao estimar a rota',
        variant: 'destructive',
      })
    },
  })

  const { mutateAsync: confirmRide, isPending: isLoadingConfirmRide } =
    useMutation({
      mutationFn: (driver: DriverModel) =>
        ridesController.confirm({
          customer_id: formMethods.getValues('customer_id'),
          origin: formMethods.getValues('origin'),
          destination: formMethods.getValues('destination'),
          distance: estimatedRouteData!.distance,
          duration: estimatedRouteData!.duration,
          driver: {
            id: driver.id,
            name: driver.name,
          },
          value: driver.value,
        }),
    })

  const steps = [
    {
      key: Steps.ESTIMATE,
      label: 'Estimativa',
      component: (
        <EstimateStep
          estimateRoute={estimateRoute}
          isLoadingEstimateRoute={isLoadingEstimateRoute}
          onContinue={() => setCurrentStep(1)}
        />
      ),
    },
    {
      key: Steps.DRIVERS,
      label: 'Drivers',
      component: (
        <DriversStep
          estimatedRouteData={estimatedRouteData}
          onBack={() => setCurrentStep(Steps.ESTIMATE)}
        />
      ),
    },
  ]

  return (
    <FormProvider {...formMethods}>
      <RideCheckoutContext.Provider
        value={{ confirmRide, setCurrentStep, isLoadingConfirmRide }}
      >
        <section className='flex flex-col gap-4'>
          <div>{steps[currentStep].component}</div>
        </section>
      </RideCheckoutContext.Provider>
    </FormProvider>
  )
}
