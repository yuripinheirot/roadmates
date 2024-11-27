import { formatDuration } from '@/utils/utils'
import { EstimateResponseType } from '@/api/controllers/rides/protocols/estimate.response.type'
import { Typography } from '@/components/ui/typography'
import { formatDistance } from '@/utils/utils'

type RideInfoProps = {
  origin: string
  destination: string
  estimatedRouteData: EstimateResponseType | undefined
}

export const RideInfo = ({
  origin,
  destination,
  estimatedRouteData,
}: RideInfoProps) => {
  return (
    <div>
      <Typography
        variant='body1'
        weight='semibold'
      >
        Informações sobre a viagem
      </Typography>
      <div className='flex flex-col gap-2 bg-blue-100 p-4 rounded-lg border border-gray-200'>
        <Typography
          variant='body2'
          weight='regular'
          className='capitalize'
        >
          Origem: {origin}
        </Typography>
        <Typography
          variant='body2'
          weight='regular'
          className='capitalize'
        >
          Destino: {destination}
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
    </div>
  )
}
