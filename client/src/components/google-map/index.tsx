import { Map } from '@vis.gl/react-google-maps'
import { Markers } from './marker'
import { MarkerType } from './types'
import { useEffect, useState } from 'react'

type Props = {
  markers: MarkerType[]
  defaultZoom?: number
  defaultCenter?: { lat: number; lng: number }
}

export const GoogleMap = ({ markers, defaultZoom, defaultCenter }: Props) => {
  const [zoom, setZoom] = useState(defaultZoom || 4)

  useEffect(() => {
    setZoom(4)
  }, [markers])

  return (
    <Map
      mapId='afe811e4017a5a32'
      zoom={zoom}
      onZoomChanged={(zoom) => setZoom(zoom.detail.zoom)}
      defaultZoom={defaultZoom || 4}
      defaultCenter={defaultCenter || { lat: -14.235004, lng: -51.92528 }}
    >
      <Markers points={markers} />
    </Map>
  )
}
