import { MainLayout } from './layouts/main.layout'
import { EstimateView } from './views/estimate/estimate.view'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { NotFoundView } from './views/not-found/not-found.view'
export const App = () => {
  return (
    <MainLayout>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={<EstimateView />}
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
