import { Typography } from '@/components/ui/typography'
import { CardDesign } from './card-design'
import { RideModel } from '@/domain/models/ride.model'

type Props = {
  data: RideModel[]
}

export const RidesCards = ({ data }: Props) => {
  const renderCards = () => {
    return data.map((data) => (
      <CardDesign
        data={data}
        key={data.id}
      />
    ))
  }

  const NoData = () => {
    return (
      <div className='flex flex-col items-center justify-center p-4 '>
        <Typography
          variant='body3'
          fontColor={'muted'}
        >
          Nenhum dado foi encontrado
        </Typography>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-4'>
      {data.length ? renderCards() : <NoData />}
    </div>
  )
}
