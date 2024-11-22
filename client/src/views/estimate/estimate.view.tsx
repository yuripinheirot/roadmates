import { SubmitHandler } from 'react-hook-form'
import { EstimateFormSchemaType } from './components/form/schema'
import { EstimateForm } from './components/form'

export const EstimateView = () => {
  const onSubmit: SubmitHandler<EstimateFormSchemaType> = (data) => {
    console.log(data)
  }

  return (
    <div>
      <EstimateForm onSubmit={onSubmit} />
    </div>
  )
}
