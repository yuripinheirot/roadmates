import { http } from '@/api/http'
import { CustomerModel } from '@/domain/models/customer.model'

export const customerController = {
  findAll: async (): Promise<CustomerModel[]> => {
    const response = await http.get('/customers')
    return response.data
  },
}
