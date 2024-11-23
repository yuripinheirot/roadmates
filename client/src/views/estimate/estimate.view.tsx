import { useState } from 'react'
import { EstimateStep } from './components/steps/estimate.step'
import { RideConfirmedStep } from './components/steps/ride-confirmed.step'
import { Steps } from './types'
import { BottomButtons } from './components/botton-buttons'

export const EstimateView = () => {
  const [currentStep, setCurrentStep] = useState(0)

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
    setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    setCurrentStep(currentStep - 1)
  }

  return (
    <div className='flex flex-col gap-4'>
      <div>{steps[currentStep].component}</div>
      <BottomButtons
        onBack={handleBack}
        onContinue={handleContinue}
        showBack={currentStep !== 0}
        showContinue={currentStep !== steps.length - 1}
      />
    </div>
  )
}
