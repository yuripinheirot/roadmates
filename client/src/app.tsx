import { MainLayout } from './layouts/main.layout'
import { RideCheckoutView } from './views/ride-checkout/ride-checkout.view'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { NotFoundView } from './views/not-found/not-found.view'
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
            path='*'
            element={<NotFoundView />}
          />
        </Routes>
      </BrowserRouter>
    </MainLayout>
  )
}
