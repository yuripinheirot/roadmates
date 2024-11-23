import { BottomButtons } from '../botton-buttons'

type Props = {
  onBack: () => void
}

export const RideConfirmedStep = ({ onBack }: Props) => {
  return (
    <div>
      <BottomButtons
        showBack={true}
        showContinue={false}
        onBack={onBack}
      />
    </div>
  )
}
