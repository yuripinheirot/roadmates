import { MainLayout } from './layouts/main.layout'
import { RideCheckoutView } from './views/ride-checkout/ride-checkout.view'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { NotFoundView } from './views/not-found/not-found.view'
import { Toaster } from '@/components/ui/toaster'
import { RideHistoryView } from './views/ride-history/ride-history.view'
import { HomeView } from './views/home/home.view'
import logo from '@/assets/logo-black.svg'
import { Breadcrumb } from './components/breadcrumb/breadcrumb'
import { summaryRoutes } from './utils/summary-routes'

export const App = () => {
  return (
    <MainLayout>
      <BrowserRouter>
        <Breadcrumb />
        <Routes>
          <Route
            path={summaryRoutes.home}
            element={<HomeView />}
          />
          <Route
            path={summaryRoutes.estimate}
            element={<RideCheckoutView />}
          />
          <Route
            path={summaryRoutes.history}
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
