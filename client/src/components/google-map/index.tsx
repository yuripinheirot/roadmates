import { Map } from '@vis.gl/react-google-maps'
import { Markers } from './marker'
import { MarkerType } from './types'

export const GoogleMap = ({ markers }: { markers: MarkerType[] }) => {
  return (
    <Map
      defaultZoom={10}
      defaultCenter={{ lat: -23.533773, lng: -46.62529 }}
      mapId='afe811e4017a5a32'
    >
      <Markers points={markers} />
    </Map>
  )
}
