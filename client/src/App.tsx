import { MainLayout } from './layouts/main.layout'
import { EstimateView } from './views/estimate/estimate.view'

export const App = () => {
  return (
    <MainLayout>
      <EstimateView />
    </MainLayout>
  )
}
