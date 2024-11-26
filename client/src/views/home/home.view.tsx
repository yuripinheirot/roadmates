import { Button } from '@/components/ui/button'
import { summaryRoutes } from '@/utils/summary-routes'
import { useNavigate } from 'react-router'

export const HomeView = () => {
  const navigate = useNavigate()

  return (
    <div className='flex flex-col gap-4'>
      <Button onClick={() => navigate(summaryRoutes.estimate)}>
        Procurar corrida
      </Button>
      <Button onClick={() => navigate(summaryRoutes.history)}>Histórico</Button>
    </div>
  )
}
