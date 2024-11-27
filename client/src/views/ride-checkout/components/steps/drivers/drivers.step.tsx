import { BottomButtons } from '../../botton-buttons'
import { GoogleMapPreview } from './google-map-preview'
import { EstimateResponseType } from '@/api/controllers/rides/protocols/estimate.response.type'
import { DriversCards } from './cards'
import { Typography } from '@/components/ui/typography'
import { formatDistance, formatDuration } from '@/utils/utils'
import { useFormContext } from 'react-hook-form'
import { RideInfo } from './ride-info'

type Props = {
  estimatedRouteData: EstimateResponseType | undefined
  onBack: () => void
}

export const DriversStep = ({ estimatedRouteData, onBack }: Props) => {
  const { getValues } = useFormContext()
  const { origin, destination } = getValues()
  return (
    <section className='flex flex-col gap-4'>
      <GoogleMapPreview data={estimatedRouteData} />
      <RideInfo
        origin={origin}
        destination={destination}
        estimatedRouteData={estimatedRouteData}
      />
      <DriversCards data={estimatedRouteData?.options || []} />
      <BottomButtons
        showBack={true}
        showContinue={false}
        onBack={onBack}
      />
    </section>
  )
}
