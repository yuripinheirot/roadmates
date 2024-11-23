import { useState } from 'react'
import { EstimateStep } from './components/steps/estimate.step'
import { RideConfirmedStep } from './components/steps/ride-confirmed.step'
import { Steps } from './types'
import { BottomButtons } from './components/botton-buttons'
import { FormProvider, useForm } from 'react-hook-form'
import { EstimateFormSchemaType } from './components/forms/schema'
import { EstimateFormSchema } from './components/forms/schema'
import { zodResolver } from '@hookform/resolvers/zod'
export const RideCheckoutView = () => {
  const [currentStep, setCurrentStep] = useState(0)

  const formMethods = useForm<EstimateFormSchemaType>({
    resolver: zodResolver(EstimateFormSchema),
  })

  const steps = [
    {
      key: Steps.ESTIMATE,
      label: 'Estimativa',
      component: <EstimateStep />,
    },
    {
      key: Steps.RIDE_CONFIRMED,
      label: 'Sucesso!',
      component: <RideConfirmedStep />,
    },
  ]

  const handleContinue = () => {
    if (!formMethods.formState.isValid) {
      formMethods.trigger()
      return
    }
    setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    setCurrentStep(currentStep - 1)
  }

  return (
    <FormProvider {...formMethods}>
      <section className='flex flex-col gap-4'>
        <div>{steps[currentStep].component}</div>
        <BottomButtons
          onBack={handleBack}
          onContinue={handleContinue}
          showBack={currentStep !== 0}
          showContinue={currentStep !== steps.length - 1}
        />
      </section>
    </FormProvider>
  )
}
