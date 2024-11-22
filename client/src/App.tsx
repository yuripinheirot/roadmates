import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { MainLayout } from './layouts/main.layout'
import { useForm, SubmitHandler } from 'react-hook-form'
import { InputControlled } from './components/controlled/input.controlled'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { defaultMessages } from './constants/default-messages.const'

export const FormDataSchema = z.object({
  customer_id: z.string().min(1, { message: defaultMessages.required }),
  origin: z.string().min(1, { message: defaultMessages.required }),
  destination: z.string().min(1, { message: defaultMessages.required }),
})

export const App = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof FormDataSchema>>({
    resolver: zodResolver(FormDataSchema),
  })

  const onSubmit: SubmitHandler<z.infer<typeof FormDataSchema>> = (data) => {
    console.log(data)
  }

  return (
    <MainLayout>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-4'
      >
        <Typography>Hello World</Typography>
        <InputControlled
          register={register}
          name='customer_id'
          required
          error={errors.customer_id}
        />
        <InputControlled
          register={register}
          name='origin'
          required
          error={errors.origin}
        />
        <InputControlled
          register={register}
          name='destination'
          required
          error={errors.destination}
        />
        <Button type='submit'>confirm</Button>
      </form>
    </MainLayout>
  )
}
