import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Card,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { RideModel } from '@/domain/models/ride.model'
import { DineroUtils } from '@/utils/dinero'
import { format, formatDuration, intervalToDuration } from 'date-fns'
import { ptBR } from 'date-fns/locale'
export const CardDesign = ({ data }: { data: RideModel }) => {
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

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>
          {data.origin} - {data.destination}
        </CardTitle>
        <CardDescription>{data.origin}</CardDescription>
        <CardDescription>{data.destination}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col gap-2'>
          <SubItem
            title='Motorista'
            value={data.driver?.name}
          />
          <SubItem
            title='Data'
            value={format(data.date, 'dd/MM/yyyy')}
          />
          <SubItem
            title='Distância'
            value={`${data.distance} km`}
          />
          <SubItem
            title='Tempo'
            value={formatDuration(
              intervalToDuration({
                start: 0,
                end: Number(data.duration.replace('s', '')) * 100,
              }),
              {
                locale: ptBR,
              }
            )}
          />
          <SubItem
            title='Valor'
            value={DineroUtils.formatToString({
              value: data.value,
              precision: 2,
            })}
          />
        </div>
      </CardContent>
      <CardFooter className='flex justify-end'>
        <Button>Escolher</Button>
      </CardFooter>
    </Card>
  )
}
