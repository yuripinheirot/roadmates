import { RideModel } from '@/domain/models/ride.model'
import React from 'react'

type Props = {
  data: RideModel
}
export const CardDesign = ({ data }: Props) => {
  console.log('🚀 ~ CardDesign ~ data:', data)
  return (
    <div>
      {data.origin} {data.destination}
    </div>
  )
}
