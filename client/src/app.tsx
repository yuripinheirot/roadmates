import { MainLayout } from './layouts/main.layout'
import { RideCheckoutView } from './views/ride-checkout/ride-checkout.view'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { NotFoundView } from './views/not-found/not-found.view'
import { Toaster } from '@/components/ui/toaster'
import { RideHistoryView } from './views/ride-history'
export const App = () => {
  return (
    <MainLayout>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={<RideCheckoutView />}
          />
          <Route
            path='/history'
            element={<RideHistoryView />}
          />
          <Route
            path='*'
            element={<NotFoundView />}
          />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </MainLayout>
  )
}
