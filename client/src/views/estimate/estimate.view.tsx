import { SubmitHandler } from 'react-hook-form'
import { EstimateFormSchemaType } from './components/form/schema'
import { EstimateForm } from './components/form'
import { useQuery } from '@tanstack/react-query'
import { customerController } from '@/api/controllers/customers/customer.controller'

export const EstimateView = () => {
  const { data: customers, isLoading: isLoadingCustomers } = useQuery({
    queryKey: ['customers'],
    queryFn: () => customerController.findAll(),
  })

  const onSubmit: SubmitHandler<EstimateFormSchemaType> = (data) => {
    console.log(data)
  }

  return (
    <div>
      <EstimateForm
        onSubmit={onSubmit}
        data={{ customers: customers || [] }}
      />
    </div>
  )
}
