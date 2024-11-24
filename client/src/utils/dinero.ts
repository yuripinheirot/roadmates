import Dinero from 'dinero.js'

type FormatToStringType = {
  value: Dinero.Dinero | number | string | null
  precision?: number
  language?: string
}

type ConvertNumberToDineroType = {
  amount: number
  precision?: number
  currency?: Dinero.Currency
}

export class DineroUtils {
  static decimalToInt(decimal: number): number {
    const withoutDot = String(decimal).replaceAll('.', '')
    return parseInt(withoutDot, 10)
  }

  static convertToDinero = ({
    amount,
    precision = 0,
    currency = 'BRL',
  }: ConvertNumberToDineroType) => {
    return Dinero({ amount, currency, precision })
  }

  static validateValue = (value: any): boolean => {
    if (value === null || value === undefined || isNaN(+value)) return false

    return true
  }

  static formatToString = ({
    value,
    precision = 0,
    language = 'pt-BR',
  }: FormatToStringType): string => {
    const invalidValue = '-'

    if (value && !/^[^\p{L}]*$|[\p{Sc}]/gu.test(value.toString())) {
      return ''
    }
    if (value === null || value === undefined) return invalidValue

    if (typeof value === 'number') {
      return DineroUtils.formatNumber({ value, precision, language })
    }

    if (typeof value === 'string') {
      return DineroUtils.formatString({ value, precision, language })
    }

    return invalidValue
  }

  private static formatNumber = ({
    value,
    precision,
    language,
  }: Required<FormatToStringType>): string => {
    const intValue = DineroUtils.decimalToInt(value as number)
    const dineroObject = DineroUtils.convertToDinero({
      amount: intValue,
      precision,
    })
    return DineroUtils.formatDinero({ dineroObject, language })
  }

  private static formatString = ({
    value,
    precision,
    language,
  }: Required<FormatToStringType>): string => {
    const amount = DineroUtils.parseStringToSubTotalDebtValue(value as string)
    const dineroObject = DineroUtils.convertToDinero({ amount, precision })
    return DineroUtils.formatDinero({ dineroObject, language })
  }

  private static parseStringToSubTotalDebtValue = (value: string): number => {
    if (!isNaN(parseFloat(value)) && value.includes('.')) {
      const [reals, cents] = value.split('.')
      return parseInt(reals, 10) * 100 + parseInt(cents || '0', 10)
    } else {
      return parseInt(value.replace(/\D/g, ''), 10)
    }
  }

  private static formatDinero = ({
    dineroObject,
    language,
  }: {
    dineroObject: Dinero.Dinero
    language: string
  }): string => {
    return dineroObject.setLocale(language).toFormat('$0,0.00')
  }

  static convertToNumber(monetaryValue: string): number {
    const valueWithoutSymbol = monetaryValue.replace(/^R\$\s*/, '')
    const internationalFormattedValue = valueWithoutSymbol
      .replace(/\./g, '')
      .replace(/,/g, '')
    const numericValue = Number(internationalFormattedValue)

    return numericValue
  }
}
