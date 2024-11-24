import { DriverModel } from '@/domain/models/driver.model'
import { CardDesign } from './card-design'

type Props = {
  data: DriverModel[]
}

export const DriversCards = ({ data }: Props) => {
  const renderCards = () => {
    return data.map((data) => <CardDesign data={data} />)
  }

  return <div className='flex flex-col gap-4'>{renderCards()}</div>
}
