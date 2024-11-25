/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Control, FieldError } from 'react-hook-form'
import { LabelInput } from '@/components/ui/label-input'
import { FormField, FormItem } from '@/components/ui/form'
import { Typography } from '../ui/typography'

type SelectControlledProps = {
  data: { key: string; value: any }[]
  control: Control<any>
  label?: string
  name: string
  placeholder?: string
  isLoading?: boolean
  error?: FieldError
  optionAll?: boolean
  defaultValue?: string
}

export const SelectControlled = ({
  data,
  control,
  label,
  name,
  placeholder,
  isLoading,
  error,
  optionAll,
  defaultValue,
}: SelectControlledProps) => {
  const renderOptions = () => {
    return data.map((data) => (
      <SelectItem
        key={data.key}
        value={data.key}
      >
        {data.value}
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
            defaultValue={defaultValue}
          >
            <SelectTrigger
              className='flex items-center gap-2'
              isLoading={isLoading}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {optionAll && <SelectItem value={'*'}>Todos</SelectItem>}
              {renderOptions()}
            </SelectContent>
          </Select>
          {error && (
            <Typography
              variant={'body3'}
              className='text-red-500'
            >
              {error.message}
            </Typography>
          )}
        </FormItem>
      )}
    />
  )
}
