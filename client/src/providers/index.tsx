import { QueryClientProviderBase } from './query-client.provider'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <QueryClientProviderBase>{children}</QueryClientProviderBase>
}
