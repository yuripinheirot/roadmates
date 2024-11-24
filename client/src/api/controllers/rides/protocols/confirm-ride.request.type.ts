export type ConfirmRideRequestType = {
  customer_id: string
  origin: string
  destination: string
  distance: number
  duration: string
  driver: {
    id: string
    name: string
  }
  value: number
}
