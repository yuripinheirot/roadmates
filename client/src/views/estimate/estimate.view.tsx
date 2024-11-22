import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  EstimateFormSchemaType,
  EstimateFormSchema,
} from './components/form/schema'
import { EstimateForm } from './components/form'
import { useQuery } from '@tanstack/react-query'
import { customerController } from '@/api/controllers/customers/customer.controller'

export const EstimateView = () => {
  const { data: customers } = useQuery({
    queryKey: ['customers'],
    queryFn: () => customerController.findAll(),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EstimateFormSchemaType>({
    resolver: zodResolver(EstimateFormSchema),
  })

  const onSubmit: SubmitHandler<EstimateFormSchemaType> = (data) => {
    console.log(data)
  }

  return (
    <div>
      <EstimateForm
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        onSubmit={onSubmit}
      />
    </div>
  )
}
