import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Card,
} from '@/components/ui/card'
import { DriverModel } from '@/domain/models/driver.model'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { DineroUtils } from '@/utils/dinero'
import { Rating } from '@smastrom/react-rating'
import { useContext } from 'react'
import { RideCheckoutContext } from '../../ride-checkout.view'
import { Steps } from '../../types'

export const CardDesign = ({ data }: { data: DriverModel }) => {
  const { setSelectedDriver, setCurrentStep } = useContext(RideCheckoutContext)

  const SubItem = ({
    title,
    value,
    component,
  }: {
    title: string
    value?: string
    component?: React.ReactNode
  }) => {
    return (
      <div className='flex justify-between'>
        <Typography
          variant={'body3'}
          weight={'bold'}
          fontColor={'muted'}
        >
          {title}
        </Typography>
        {component ? (
          component
        ) : (
          <Typography variant={'body3'}>{value}</Typography>
        )}
      </div>
    )
  }

  const handleSelectDriver = () => {
    setSelectedDriver(data)
    setCurrentStep(Steps.RIDE_CONFIRMED)
  }

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>{data.name}</CardTitle>
        <CardDescription>{data.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col gap-2'>
          <SubItem
            title='Veículo'
            value={data.vehicle}
          />
          <SubItem
            title='Avaliação'
            component={
              <div className='flex items-center gap-2 max-w-[80px] max-h-[20px]'>
                <Rating value={data.review.rating} />
              </div>
            }
          />
          <SubItem
            title='Preço'
            value={DineroUtils.formatToString({
              value: data.value,
              precision: 2,
            })}
          />
        </div>
      </CardContent>
      <CardFooter className='flex justify-end'>
        <Button onClick={handleSelectDriver}>Escolher</Button>
      </CardFooter>
    </Card>
  )
}
