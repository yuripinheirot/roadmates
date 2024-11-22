import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CustomerModel } from '@/models/customer.model'
import { Control, UseFormRegister } from 'react-hook-form'
import { LabelInput } from '@/components/ui/label-input'
import { FormField, FormItem } from '@/components/ui/form'

type SelectControlledProps = {
  data: CustomerModel[]
  control: Control<any>
  label?: string
  name: string
  placeholder?: string
}

export const SelectControlled = ({
  data,
  control,
  label,
  name,
  placeholder,
}: SelectControlledProps) => {
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
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex flex-col'>
          {label && (
            <LabelInput
              label={label}
              className='-mb-2'
            />
          )}
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>{renderOptions()}</SelectContent>
          </Select>
        </FormItem>
      )}
    />
  )
}
