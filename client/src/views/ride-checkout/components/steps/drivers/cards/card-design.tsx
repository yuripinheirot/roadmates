/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
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
import { useCallback, useContext } from 'react'
import { toast } from '@/hooks/use-toast'
import { useNavigate } from 'react-router'
import { summaryRoutes } from '@/utils/summary-routes'
import { useFormContext } from 'react-hook-form'
import { RideCheckoutContext } from '@/views/ride-checkout/contexts/ride-checkout.context'
import {
  calculateTotalValue as calculateTotalValueUtils,
  formatDistance,
} from '@/utils/utils'
export const CardDesign = ({ data }: { data: DriverModel }) => {
  const navigate = useNavigate()
  const { confirmRide, isLoadingConfirmRide, estimatedRouteData } =
    useContext(RideCheckoutContext)
  const { getValues } = useFormContext()

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

  const handleSelectDriver = async () => {
    await confirmRide(data)

    toast({
      title: 'Viagem confirmada com sucesso!',
      variant: 'success',
    })
    navigate(
      `${summaryRoutes.history}?driver_id=${data.id}&customer_id=${getValues(
        'customer_id'
      )}`
    )
  }

  const calculateTotalValue = useCallback(() => {
    const total = calculateTotalValueUtils(
      estimatedRouteData?.distance!,
      data.value
    )

    return total
  }, [estimatedRouteData, data.value])

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
            title='Km mínimo'
            value={formatDistance(data.minDistance)}
          />
          <SubItem
            title='Preço por km'
            value={DineroUtils.formatToString({
              value: data.value,
              precision: 2,
            })}
          />
          <SubItem
            title='Valor total'
            value={DineroUtils.formatToString({
              value: calculateTotalValue(),
              precision: 2,
            })}
          />
        </div>
      </CardContent>
      <CardFooter className='flex justify-end'>
        <Button
          onClick={handleSelectDriver}
          isLoading={isLoadingConfirmRide}
        >
          Escolher
        </Button>
      </CardFooter>
    </Card>
  )
}
