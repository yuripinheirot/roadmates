import {
  FieldValues,
  SubmitHandler,
} from 'node_modules/react-hook-form/dist/types'
import { EstimateForm } from '../forms/estimate.form'
import { EstimateFormSchemaType } from '../forms/schema'
import { GoogleMapPreview } from '../google-map-preview'
import { EstimateResponseType } from '@/api/controllers/rides/protocols/estimate.response.type'

type Props = {
  estimateRoute: (data: EstimateFormSchemaType) => Promise<EstimateResponseType>
  estimatedRouteData: EstimateResponseType | undefined
  isLoadingEstimateRoute: boolean
}

export const EstimateStep = ({
  estimateRoute,
  estimatedRouteData,
  isLoadingEstimateRoute,
}: Props) => {
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
