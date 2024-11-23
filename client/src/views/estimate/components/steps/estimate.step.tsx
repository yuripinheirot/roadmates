import { SubmitHandler } from 'node_modules/react-hook-form/dist/types'
import { EstimateForm } from '../forms/estimate'
import { EstimateFormSchemaType } from '../forms/schema'
import { GoogleMapPreview } from '../../google-map-preview'
import { useMutation } from '@tanstack/react-query'
import { ridesController } from '@/api/controllers/rides/rides.controller'

export const EstimateStep = () => {
  const { mutateAsync: estimateRoute, data: estimatedRouteData } = useMutation({
    mutationFn: (data: EstimateFormSchemaType) =>
      ridesController.estimate(data),
  })

  const onSubmit: SubmitHandler<EstimateFormSchemaType> = async (data) => {
    await estimateRoute(data)
  }

  return (
    <div className='flex flex-col gap-4'>
      <EstimateForm onSubmit={onSubmit} />
      <GoogleMapPreview data={estimatedRouteData} />
    </div>
  )
}
