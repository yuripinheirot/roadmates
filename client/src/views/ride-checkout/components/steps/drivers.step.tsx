import { BottomButtons } from '../botton-buttons'
import { GoogleMapPreview } from '../google-map-preview'
import { EstimateResponseType } from '@/api/controllers/rides/protocols/estimate.response.type'
import { DriversCards } from '../drivers-cards/drivers-cards'

type Props = {
  estimatedRouteData: EstimateResponseType | undefined
  onBack: () => void
  onContinue: () => void
}

export const DriversStep = ({ estimatedRouteData, onBack }: Props) => {
  return (
    <section className='flex flex-col gap-4'>
      <GoogleMapPreview data={estimatedRouteData} />
      <DriversCards data={estimatedRouteData?.options || []} />
      <BottomButtons
        showBack={true}
        showContinue={false}
        onBack={onBack}
      />
    </section>
  )
}
