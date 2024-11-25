import { RideModel } from '@/domain/models/ride.model'

export type CustomRideModel = RideModel & {
  driver: {
    name: string
  }
}

export type ListResponseType = {
  customer_id: string
  rides: CustomRideModel[]
}
