import { Typography } from '@/components/ui/typography'
import { CardDesign } from './card-design'
import { RideModel } from '@/domain/models/ride.model'

type Props = {
  data: RideModel[] | null | undefined
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

  const render = () => {
    if (data === null || data === undefined) return <></>
    return data.length ? renderCards() : <NoData />
  }

  return <div className='flex flex-col gap-4'>{render()}</div>
}
