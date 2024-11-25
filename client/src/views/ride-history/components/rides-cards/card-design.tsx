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
import { CustomRideModel } from '@/api/controllers/rides/protocols/list.response.type'

export const CardDesign = ({ data }: { data: CustomRideModel }) => {
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
        <CardTitle>{data.driver.name}</CardTitle>
        <CardDescription>{data.origin}</CardDescription>
        <CardDescription>{data.destination}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col gap-2'>
          <SubItem
            title='Data'
            value={data.date.toString()}
          />
          <SubItem
            title='Distância'
            value={`${data.distance} km`}
          />
          <SubItem
            title='Tempo'
            value={data.duration}
          />
        </div>
      </CardContent>
      <CardFooter className='flex justify-end'>
        <Button>Escolher</Button>
      </CardFooter>
    </Card>
  )
}
