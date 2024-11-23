import { SubmitHandler } from 'node_modules/react-hook-form/dist/types'
import { EstimateForm } from '../forms/estimate'
import { EstimateFormSchemaType } from '../forms/schema'
import { GoogleMapPreview } from '../../google-map-preview'

export const EstimateStep = () => {
  const onSubmit: SubmitHandler<EstimateFormSchemaType> = (data) => {
    console.log(data)
  }

  return (
    <div className='flex flex-col gap-4'>
      <EstimateForm onSubmit={onSubmit} />
      <GoogleMapPreview />
    </div>
  )
}
