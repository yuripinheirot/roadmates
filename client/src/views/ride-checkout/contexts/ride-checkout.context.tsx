/* eslint-disable @typescript-eslint/no-unused-vars */
import { EstimateResponseType } from '@/api/controllers/rides/protocols/estimate.response.type'
import { DriverModel } from '@/domain/models/driver.model'
import { createContext } from 'react'

export const RideCheckoutContext = createContext({
  setCurrentStep: (step: number) => {},
  confirmRide: async (driver: DriverModel) => {},
  isLoadingConfirmRide: false,
  estimatedRouteData: null as EstimateResponseType | null,
})
