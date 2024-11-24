import { EstimateFormSchemaType } from '@/views/ride-checkout/components/forms/schema'
import { http } from '@/api/http'
import { EstimateResponseType } from './protocols/estimate.response.type'
import { ConfirmRideRequestType } from './protocols/confirm-ride.request.type'

export const ridesController = {
  estimate: async (
    data: EstimateFormSchemaType
  ): Promise<EstimateResponseType> => {
    const response = await http.post('/rides/estimate', data)
    return response.data
  },
  confirm: async (data: ConfirmRideRequestType): Promise<void> => {
    const response = await http.patch('/rides/confirm', data)
    return response.data
  },
}
