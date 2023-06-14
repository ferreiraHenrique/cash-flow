import { v4 as uuidv4 } from 'uuid';

export interface IMonth {
  id: string
  name: string
}


export class Month implements IMonth {
  id: string
  name: string

  constructor(data?: any) {
    if (data?.id) {
      this.id = data.id
    } else {
      this.id = uuidv4()
    }
    this.name = data?.name
  }
}

export type MonthsContextType = {
  months: IMonth[]
  addMonth: (month: IMonth) => void
  removeMonth: (month: IMonth) => void
  updateMonth: (month: IMonth) => void
}
