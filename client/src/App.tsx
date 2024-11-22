import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { MainLayout } from './layouts/main.layout'

export const App = () => {
  return (
    <MainLayout>
      <Button>Hello World</Button>
      <Typography>Hello World</Typography>
    </MainLayout>
  )
}
