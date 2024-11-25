import { Button } from '@/components/ui/button'
import { RideHistoryForm } from './components/form/ride-history.form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import {
  HistoryFormSchema,
  HistoryFormSchemaType,
} from './components/form/schema'

export const RideHistoryView = () => {
  const formMethods = useForm<HistoryFormSchemaType>({
    resolver: zodResolver(HistoryFormSchema),
  })

  return (
    <FormProvider {...formMethods}>
      <RideHistoryForm onSubmit={() => null}>
        <Button>Buscar</Button>
      </RideHistoryForm>
    </FormProvider>
  )
}
