import { AdvancedMarker, Pin } from '@vis.gl/react-google-maps'
import { MarkerType } from './types'

export const Markers = (props: { points: MarkerType[] }) => {
  return (
    <>
      {props.points.map((marker: MarkerType) => (
        <AdvancedMarker
          key={marker.key}
          position={marker.location}
        >
          <Pin
            background={'#fb3e04'}
            glyphColor={'#000'}
            borderColor={'#000'}
          />
        </AdvancedMarker>
      ))}
    </>
  )
}
