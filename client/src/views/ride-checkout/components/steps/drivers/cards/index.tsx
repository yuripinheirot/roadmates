import { DriverModel } from '@/domain/models/driver.model'
import { CardDesign } from './card-design'
import { Typography } from '@/components/ui/typography'

type Props = {
  data: DriverModel[]
}

export const DriversCards = ({ data }: Props) => {
  const renderCards = () => {
    return data.map((data) => <CardDesign data={data} />)
  }

  return (
    <div>
      <Typography
        variant='body1'
        weight='semibold'
      >
        Selecione um motorista
      </Typography>
      <div className='flex flex-col gap-4'>{renderCards()}</div>
    </div>
  )
}
