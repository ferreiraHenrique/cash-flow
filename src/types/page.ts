import { IconDefinition, faArrowDown, faArrowUp, faCalendar, faCreditCard, faDashboard } from "@fortawesome/free-solid-svg-icons"
import { NextRouter } from "next/router"

export interface IPage {
  name: string
  label: string
  url: string
  urlVariants: string[]
  icon: IconDefinition
}

export const pages: IPage[] = [
  { name: 'dashboard', label: 'Dashboard', url: '/dashboard', urlVariants: ['/dashboard'], icon: faDashboard },
  { name: 'periods', label: 'Períodos', url: '/periodos', urlVariants: ['/periodos', '/periodos/[id]', '/periodos/meses/[...slug]'], icon: faCalendar },
  { name: 'receipts', label: 'Receitas fixas', url: '/receitas', urlVariants: ['/receitas'], icon: faArrowUp },
  { name: 'expenses', label: 'Despesas fixas', url: '/despesas', urlVariants: ['/despesas'], icon: faArrowDown },
  { name: 'cards', label: 'Cartões de crédito', url: '/cartoes', urlVariants: ['/cartoes'], icon: faCreditCard },
]

export function getCurrentPage(router: NextRouter): IPage {
  const current = pages.filter(p => p.urlVariants.includes(router.route))
  return current[0]
}
