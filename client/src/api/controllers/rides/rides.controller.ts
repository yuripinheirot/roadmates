import { EstimateFormSchemaType } from '@/views/ride-checkout/components/forms/schema'
import { http } from '@/api/http'
import { EstimateResponseType } from './protocols/estimate.response.type'
import { ConfirmRideRequestType } from './protocols/confirm-ride.request.type'
import { ListRequestDto } from './protocols/list.request.dto'
import { ListResponseType } from './protocols/list.response.type'

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
  list: async ({
    customer_id,
    driver_id,
  }: ListRequestDto): Promise<ListResponseType> => {
    const driver_id_param = driver_id === '*' ? undefined : driver_id

    const response = await http.get(`/rides/${customer_id}`, {
      params: {
        driver_id: driver_id_param,
      },
    })

    return response.data
  },
}
