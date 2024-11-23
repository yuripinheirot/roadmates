import {
  FieldValues,
  SubmitHandler,
} from 'node_modules/react-hook-form/dist/types'
import { EstimateForm } from '../forms/estimate.form'
import { EstimateFormSchemaType } from '../forms/schema'
import { EstimateResponseType } from '@/api/controllers/rides/protocols/estimate.response.type'
import { BottomButtons } from '../botton-buttons'

type Props = {
  estimateRoute: (data: EstimateFormSchemaType) => Promise<EstimateResponseType>
  isLoadingEstimateRoute: boolean
  onContinue: () => void
}

export const EstimateStep = ({
  estimateRoute,
  isLoadingEstimateRoute,
  onContinue,
}: Props) => {
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    await estimateRoute(data as EstimateFormSchemaType)
    onContinue()
  }

  return (
    <section className='flex flex-col gap-4'>
      <EstimateForm onSubmit={onSubmit}>
        <BottomButtons
          showBack={false}
          isLoading={isLoadingEstimateRoute}
        />
      </EstimateForm>
    </section>
  )
}
