import { v4 as uuidv4 } from 'uuid';
import { IMonth, Month } from './month';

export interface IYear {
  id: string
  name: string
  months: IMonth[]
  create: () => Promise<boolean>
}

export class Year implements IYear {
  id: string
  name: string;
  months: IMonth[]

  constructor(data?: any) {
    if (data?.id) {
      this.id = data.id
    } else {
      this.id = uuidv4()
    }

    this.name = data?.name

    this.months = []
    if (data?.months) {
      this.months = data.months.map((m: any) => new Month(m))
    }
  }

  async create(): Promise<boolean> {
    try {
      const res = await fetch("/api/year", {
        method: "POST",
        body: JSON.stringify({name: this.name})
      })
      if (res.status != 200) {
        return false
      }
      const json = await res.json()
      this.id = json.id

      return true
    } catch(err) {
      return false
    }
  }
}

export type YearsContextType = {
  years: IYear[]
  isLoading: boolean
  loadCurrentYear: (showLoading?: boolean) => void
  addYear: (year: IYear) => Promise<boolean>
}
