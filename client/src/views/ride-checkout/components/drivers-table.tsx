import { ReactTable } from '@/components/react-table'
import { DriverModel } from '@/domain/models/driver.model'
import { createColumnHelper } from '@tanstack/react-table'

const columnHelper = createColumnHelper<DriverModel>()

const columns = [
  columnHelper.accessor('name', {
    id: 'Nome',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Nome</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('value', {
    header: () => 'Valor',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('description', {
    header: () => <span>Descrição</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('vehicle', {
    header: 'Veículo',
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('review.rating', {
    header: 'Avaliação',
    footer: (info) => info.column.id,
  }),
]

type Props = {
  data: DriverModel[]
}

export const DriversTable = ({ data }: Props) => {
  return (
    <ReactTable
      data={data}
      columns={columns}
    />
  )
}
