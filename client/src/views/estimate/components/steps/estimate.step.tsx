import {
  FieldValues,
  SubmitHandler,
} from 'node_modules/react-hook-form/dist/types'
import { EstimateForm } from '../forms/estimate.form'
import { EstimateFormSchemaType } from '../forms/schema'
import { GoogleMapPreview } from '../../google-map-preview'
import { useMutation } from '@tanstack/react-query'
import { ridesController } from '@/api/controllers/rides/rides.controller'

export const EstimateStep = () => {
  const {
    mutateAsync: estimateRoute,
    data: estimatedRouteData,
    isPending: isLoadingEstimateRoute,
  } = useMutation({
    mutationFn: (data: EstimateFormSchemaType) =>
      ridesController.estimate(data),
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    await estimateRoute(data as EstimateFormSchemaType)
  }

  return (
    <div className='flex flex-col gap-4'>
      <EstimateForm
        onSubmit={onSubmit}
        isLoading={isLoadingEstimateRoute}
      />
      <GoogleMapPreview data={estimatedRouteData} />
    </div>
  )
}
