import { defaultMessages } from '@/constants/default-messages.const'
import { z } from 'zod'

export type EstimateFormSchemaType = z.infer<typeof EstimateFormSchema>

export const EstimateFormSchema = z.object({
  customer_id: z.string().min(1, { message: defaultMessages.required }),
  origin: z.string().min(1, { message: defaultMessages.required }),
  destination: z.string().min(1, { message: defaultMessages.required }),
})
