import { EstimateResponseType } from '@/api/controllers/rides/protocols/estimate.response.type'
import { GoogleMap } from '@/components/google-map'

export const GoogleMapPreview = ({
  data,
}: {
  data: EstimateResponseType | undefined
}) => {
  const locations = data
    ? [
        {
          key: 'start',
          location: {
            lat: data.origin.latitude,
            lng: data.origin.longitude,
          },
        },
        {
          key: 'end',
          location: {
            lat: data.destination.latitude,
            lng: data.destination.longitude,
          },
        },
      ]
    : []

  return (
    <div className='h-[400px] w-full'>
      <GoogleMap markers={locations} />
    </div>
  )
}
