import {
  intervalToDuration,
  formatDuration as formatDurationDateFns,
} from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const formatDistance = (distance: number) => {
  const distanceInKm = distance / 1000
  return `${distanceInKm.toFixed(0)} km`
}

export const calculateTotalValue = (distance: number, value: number) => {
  const distanceInKm = distance / 1000
  const valueConverted = value / 100

  return (distanceInKm * valueConverted).toFixed(2)
}

export const formatDuration = (duration: number) => {
  return formatDurationDateFns(
    intervalToDuration({
      start: 0,
      end: Number(duration) * 1000,
    }),
    {
      locale: ptBR,
      format: ['days', 'hours', 'minutes'],
    }
  )
}
