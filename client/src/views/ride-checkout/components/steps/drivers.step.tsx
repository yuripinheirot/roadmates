import { BottomButtons } from '../botton-buttons'
import { GoogleMapPreview } from '../google-map-preview'
import { EstimateResponseType } from '@/api/controllers/rides/protocols/estimate.response.type'

type Props = {
  estimatedRouteData: EstimateResponseType | undefined
  onBack: () => void
  onContinue: () => void
}

export const DriversStep = ({
  estimatedRouteData,
  onBack,
  onContinue,
}: Props) => {
  return (
    <section className='flex flex-col gap-4'>
      <GoogleMapPreview data={estimatedRouteData} />
      <BottomButtons
        showBack={true}
        onBack={onBack}
        onContinue={onContinue}
      />
    </section>
  )
}
