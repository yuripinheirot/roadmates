export type RideModel = {
  id: string
  origin: string
  destination: string
  distance: number
  duration: string
  value: number
  date: Date
  customer_id: string
  driver_id: string
  driver?: {
    name: string
  }
}
