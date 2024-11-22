import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CustomerModel } from '@/models/customer.model'
import { UseFormRegister } from 'react-hook-form'
import { EstimateFormSchemaType } from './form/schema'
import { LabelInput } from '@/components/ui/label-input'

type CustomerSelectProps = {
  data: CustomerModel[]
  register: UseFormRegister<EstimateFormSchemaType>
  label?: string
}

export const CustomerSelect = ({
  data,
  register,
  label,
}: CustomerSelectProps) => {
  const renderOptions = () => {
    return data.map((customer) => (
      <SelectItem
        key={customer.id}
        value={customer.id}
      >
        {customer.name}
      </SelectItem>
    ))
  }

  return (
    <div className='flex flex-col '>
      {label && <LabelInput label={label} />}
      <Select {...register('customer_id', { required: true })}>
        <SelectTrigger>
          <SelectValue placeholder='Selecione um cliente' />
        </SelectTrigger>
        <SelectContent>{renderOptions()}</SelectContent>
      </Select>
    </div>
  )
}
