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

export const CardDesign = ({ data }: { data: DriverModel }) => {
  const SubItem = ({ title, value }: { title: string; value: string }) => {
    return (
      <div className='flex justify-between'>
        <Typography
          variant={'body3'}
          weight={'bold'}
          fontColor={'muted'}
        >
          {title}
        </Typography>
        <Typography variant={'body3'}>{value}</Typography>
      </div>
    )
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
            value={data.review.rating.toString()}
          />
          <SubItem
            title='Preço'
            value={data.value.toString()}
          />
        </div>
      </CardContent>
      <CardFooter className='flex justify-end'>
        <Button>Escolher</Button>
      </CardFooter>
    </Card>
  )
}
