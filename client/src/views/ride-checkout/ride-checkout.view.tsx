import { createContext, useContext, useState } from 'react'
import { EstimateStep } from './components/steps/estimate.step'
import { RideConfirmedStep } from './components/steps/ride-confirmed.step'
import { Steps } from './types'
import { FormProvider, useForm } from 'react-hook-form'
import { EstimateFormSchemaType } from './components/forms/schema'
import { EstimateFormSchema } from './components/forms/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { ridesController } from '@/api/controllers/rides/rides.controller'
import { useMutation } from '@tanstack/react-query'
import { useToast } from '@/hooks/use-toast'
import { AxiosError } from 'axios'
import { DriversStep } from './components/steps/drivers.step'
import { DriverModel } from '@/domain/models/driver.model'

export const RideCheckoutContext = createContext({
  selectedDriver: null as DriverModel | null,
  setSelectedDriver: (driver: DriverModel) => {},
  setCurrentStep: (step: number) => {},
})

export const RideCheckoutView = () => {
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedDriver, setSelectedDriver] = useState<DriverModel | null>(null)

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
          onContinue={() => setCurrentStep(Steps.RIDE_CONFIRMED)}
        />
      ),
    },
    {
      key: Steps.RIDE_CONFIRMED,
      label: 'Sucesso!',
      component: (
        <RideConfirmedStep onBack={() => setCurrentStep(Steps.DRIVERS)} />
      ),
    },
  ]

  return (
    <FormProvider {...formMethods}>
      <RideCheckoutContext.Provider
        value={{ selectedDriver, setSelectedDriver, setCurrentStep }}
      >
        <section className='flex flex-col gap-4'>
          <div>{steps[currentStep].component}</div>
        </section>
      </RideCheckoutContext.Provider>
    </FormProvider>
  )
}
