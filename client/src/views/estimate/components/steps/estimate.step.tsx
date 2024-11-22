import { SubmitHandler } from 'node_modules/react-hook-form/dist/types'
import { EstimateForm } from '../forms/estimate'
import { EstimateFormSchemaType } from '../forms/schema'

export const EstimateStep = () => {
  const onSubmit: SubmitHandler<EstimateFormSchemaType> = (data) => {
    console.log(data)
  }

  return (
    <div>
      <EstimateForm onSubmit={onSubmit} />
    </div>
  )
}
