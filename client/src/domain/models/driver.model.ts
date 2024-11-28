export type DriverModel = {
  id: string
  name: string
  value: number
  description: string
  vehicle: string
  review: {
    rating: number
    comment: string
  }
  minDistance: number
  pricePerKm: number
}
