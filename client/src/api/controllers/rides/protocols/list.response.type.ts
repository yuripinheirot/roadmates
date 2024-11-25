import { RideModel } from '@/domain/models/ride.model'

export type ListResponseType = {
  customer_id: string
  rides: RideModel[]
}
