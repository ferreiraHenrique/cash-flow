import { IconDefinition, faCalendar, faDashboard } from "@fortawesome/free-solid-svg-icons"
import { NextRouter } from "next/router"

export interface IPage {
  name: string
  label: string
  url: string
  icon: IconDefinition
}

export const pages: IPage[] = [
  {name: 'dashboard', label: 'Dashboard', url: '/dashboard', icon: faDashboard},
  {name: 'months', label: 'Meses', url: '/meses', icon: faCalendar},
]

export function getCurrentPage(router: NextRouter): IPage {
  const current = pages.filter(p => p.url == router.pathname)
  return current[0]
}
