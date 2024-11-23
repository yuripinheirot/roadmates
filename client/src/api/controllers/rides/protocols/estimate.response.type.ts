import { DriverModel } from '@/domain/models/driver.model'
import { Coordinate } from '@/domain/protocols/coordinate.type'
import { GoogleRouteResponse } from './google-route.response.type'

export type EstimateResponseType = {
  origin: Coordinate
  destination: Coordinate
  distance: number
  duration: string
  options: DriverModel[]
  routeResponse: GoogleRouteResponse
}
