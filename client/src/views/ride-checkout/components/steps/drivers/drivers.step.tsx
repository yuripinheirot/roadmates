import { BottomButtons } from '../../botton-buttons'
import { GoogleMapPreview } from './google-map-preview'
import { EstimateResponseType } from '@/api/controllers/rides/protocols/estimate.response.type'
import { DriversCards } from './cards'
import { Typography } from '@/components/ui/typography'
import { formatDistance, formatDuration } from '@/utils/utils'

type Props = {
  estimatedRouteData: EstimateResponseType | undefined
  onBack: () => void
}

export const DriversStep = ({ estimatedRouteData, onBack }: Props) => {
  return (
    <section className='flex flex-col gap-4'>
      <GoogleMapPreview data={estimatedRouteData} />
      <div className='flex flex-col gap-2 bg-blue-100 p-4 rounded-lg border border-gray-200'>
        <Typography
          variant='header3'
          weight='semibold'
        >
          Informações da viagem
        </Typography>
        <Typography
          variant='body2'
          weight='regular'
        >
          Distância: {formatDistance(estimatedRouteData?.distance || 0)}
        </Typography>
        <Typography
          variant='body2'
          weight='regular'
        >
          Tempo de viagem:{' '}
          {formatDuration(
            Number(estimatedRouteData?.duration.replace('s', ''))
          )}
        </Typography>
      </div>
      <DriversCards data={estimatedRouteData?.options || []} />
      <BottomButtons
        showBack={true}
        showContinue={false}
        onBack={onBack}
      />
    </section>
  )
}
