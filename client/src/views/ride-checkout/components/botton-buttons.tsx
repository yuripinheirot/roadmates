import { Button } from '@/components/ui/button'

export const BottomButtons = ({
  onBack,
  onContinue,
  showBack = false,
  showContinue = true,
  isLoading,
}: {
  onBack?: () => void
  onContinue?: () => void
  showBack?: boolean
  showContinue?: boolean
  isLoading?: boolean
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
      {showContinue && (
        <Button
          onClick={onContinue}
          isLoading={isLoading}
          type='submit'
        >
          Continuar
        </Button>
      )}
    </div>
  )
}
