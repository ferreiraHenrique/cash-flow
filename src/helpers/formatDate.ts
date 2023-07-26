
export function formatDate(d: Date): string {
  if (!(d instanceof Date)) {
    return ''
  }

  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
}

export function formatToInput(d: Date): string {
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();

  return `${year}-${month}-${day}`
}

export function getMonthLabel(d: Date): string {
  return `${d.toLocaleString('pt-BR', { month: 'long' }).charAt(0).toUpperCase()
    }${d.toLocaleString('pt-BR', { month: 'long' }).slice(1)}`
}
