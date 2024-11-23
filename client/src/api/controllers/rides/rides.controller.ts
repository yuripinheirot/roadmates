import { EstimateFormSchemaType } from '@/views/estimate/components/forms/schema'
import { http } from '@/api/http'
import { EstimateResponseType } from './protocols/estimate.response.type'

export const ridesController = {
  estimate: async (
    data: EstimateFormSchemaType
  ): Promise<EstimateResponseType> => {
    const response = await http.post('/rides/estimate', data)
    return response.data
  },
}
