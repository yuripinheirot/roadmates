import { GoogleMapsProvider } from './google-maps.provider'
import { QueryClientProviderBase } from './query-client.provider'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProviderBase>
      <GoogleMapsProvider>{children}</GoogleMapsProvider>
    </QueryClientProviderBase>
  )
}
