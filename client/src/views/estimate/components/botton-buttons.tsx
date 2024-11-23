import { Button } from '@/components/ui/button'

export const BottomButtons = ({
  onBack,
  onContinue,
  showBack = false,
  showContinue = true,
}: {
  onBack?: () => void
  onContinue: () => void
  showBack?: boolean
  showContinue?: boolean
}) => {
  return (
    <div className='flex justify-end gap-4'>
      {showBack && (
        <Button
          variant={'outline'}
          onClick={onBack}
        >
          Voltar
        </Button>
      )}
      {showContinue && <Button onClick={onContinue}>Continuar</Button>}
    </div>
  )
}
