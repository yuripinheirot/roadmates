import { APIProvider } from '@vis.gl/react-google-maps'

export const GoogleMapsProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <APIProvider
      apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
      onLoad={() => console.log('Maps API has loaded.')}
    >
      {children}
    </APIProvider>
  )
}
