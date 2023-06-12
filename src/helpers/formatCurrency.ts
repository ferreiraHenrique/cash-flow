
export function formatCurrency(value: number): string {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })

  return formatter.format(value)
}

export function unformatCurrency(value: string): number {
  value = value.replace(/[^\d-]/g, '')

  if (value.length < 3) {
    value = value.padStart(3, '0')
  }

  value = value.slice(0, value.length-2) + '.' + value.slice(value.length-2)
  return parseFloat(value);
}
