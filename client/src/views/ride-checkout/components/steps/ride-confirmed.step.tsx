import { Typography } from '@/components/ui/typography'
import { BottomButtons } from '../botton-buttons'

type Props = {
  onBack: () => void
}

export const RideConfirmedStep = ({ onBack }: Props) => {
  return (
    <div>
      <div className='flex flex-col gap-4'>
        <Typography variant='header1'>Sucesso!</Typography>
        <Typography variant='body1'>
          Sua solicitação foi enviada com sucesso!
        </Typography>
      </div>
      <BottomButtons
        showBack={true}
        showContinue={false}
        onBack={onBack}
      />
    </div>
  )
}
