import { GoogleMap } from '@/components/google-map'
import { Button } from '@/components/ui/button'
import { summaryRoutes } from '@/utils/summary-routes'
import { useNavigate } from 'react-router'

export const HomeView = () => {
  const navigate = useNavigate()

  return (
    <section className='flex flex-col gap-4'>
      <div className='w-full h-[550px]'>
        <GoogleMap markers={[]} />
      </div>
      <div className='flex flex-col gap-4'>
        <Button onClick={() => navigate(summaryRoutes.estimate)}>
          Procurar corrida
        </Button>
        <Button onClick={() => navigate(summaryRoutes.history)}>
          Histórico
        </Button>
      </div>
    </section>
  )
}
