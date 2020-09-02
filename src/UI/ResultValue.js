import React from 'react'
import './ResultValue.css'

export default function ResultValue({ value, resultCurrency }) {
  const sign = currencySymbolHandler(resultCurrency)

  function currencySymbolHandler(currency) {
    let sign = ''
    switch (currency) {
      case 'RUB':
        return (sign = ' \u20BD')
      case 'USD':
        return (sign = ' \u0024')
      case 'CNY':
        return (sign = ' \u00A5')
      case 'BRL':
        return (sign = ' R \u0024')
      case 'CAD':
        return (sign = ' Can \u0024')
      case 'AUD':
        return (sign = ' A \u0024')
      case 'JPY':
        return (sign = ' \u00A5')
      default:
        return sign
    }
  }
  return <span>{value + sign}</span>
}
