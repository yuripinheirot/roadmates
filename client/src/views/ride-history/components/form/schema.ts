import { defaultMessages } from '@/constants/default-messages.const'
import { z } from 'zod'

export type HistoryFormSchemaType = z.infer<typeof HistoryFormSchema>

export const HistoryFormSchema = z.object({
  customer_id: z
    .string({ required_error: defaultMessages.required })
    .min(1, { message: defaultMessages.required }),
  driver_id: z
    .string({ required_error: defaultMessages.required })
    .min(1, { message: defaultMessages.required }),
})
