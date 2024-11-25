import { http } from '@/api/http'
import { DriverModel } from '@/domain/models/driver.model'

export const driversController = {
  findAll: async (): Promise<DriverModel[]> => {
    const response = await http.get('/drivers')
    return response.data
  },
}
