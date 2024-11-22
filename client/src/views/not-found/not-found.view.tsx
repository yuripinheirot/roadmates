import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { useNavigate } from 'react-router-dom'

export const NotFoundView = () => {
  const navigate = useNavigate()

  const handleGoToHome = () => {
    navigate('/')
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen gap-4'>
      <Typography
        variant='header2'
        weight='bold'
        className='text-center'
      >
        404 - Página não encontrada
      </Typography>
      <Button onClick={handleGoToHome}>Voltar para o início</Button>
    </div>
  )
}
