import { v4 as uuidv4 } from 'uuid';
import { IMonthTransaction, MonthTransaction } from './monthTransaction';

export interface IMonth {
  id: string
  name: string
  transactions: IMonthTransaction[]
  startAt: Date
  create: () => Promise<boolean>
  delete: () => Promise<boolean>
  update: () => Promise<boolean>
  calcTotalAmount: () => number
  calcTotalDiscount: () => number
  calcTotalSubtotal: () => number
  calcTotalCredit: () => number
  calcTotalDebit: () => number
}


export class Month implements IMonth {
  id: string
  name: string
  transactions: IMonthTransaction[];
  startAt: Date;

  constructor(data?: any) {
    if (data?.id) {
      this.id = data.id
    } else {
      this.id = uuidv4()
    }
    this.name = data?.name

    if (
      data?.transactions &&
      typeof data.transactions == 'object' &&
      data.transactions.length
    ) {
      this.transactions = data.transactions.map((t:any) => new MonthTransaction(t))
    } else {
      this.transactions = []
    }

    this.startAt = new Date()
    if (data?.startAt) {
      this.startAt = new Date(data.startAt)
    }
  }

  async create(): Promise<boolean> {
    try {
      const res = await fetch("/api/month", {
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

  async delete(): Promise<boolean> {
    try {
      const res = await fetch(`/api/month/${this.id}`, {
        method: 'DELETE'
      })
      if (res.status != 200) {
        return false
      }
      return true
    } catch(err) {
      return false
    }
  }

  async update(): Promise<boolean> {
    try {
      const res = await fetch(`/api/month/${this.id}`, {
        method: 'PUT',
        body: JSON.stringify({name: this.name})
      })
      if (res.status != 200) {
        return false
      }

      return true
    } catch(err) {
      return false
    }
  }

  public calcTotalAmount(): number {
    return this.transactions.reduce((total: number, t: IMonthTransaction) => {
      if (t.isCredit) return total + t.amount
      return total - t.amount
    }, 0)
  };

  calcTotalDiscount(): number {
    return this.transactions.reduce((total: number, t: IMonthTransaction) => (
      total + t.discount
    ), 0)
  }

  calcTotalSubtotal(): number {
    return this.transactions.reduce((total: number, t: IMonthTransaction) => {
      if (t.isCredit) return total + t.calcSubtotal()
      return total - t.calcSubtotal()
    }, 0)
  };

  calcTotalCredit(): number {
    return this.transactions.filter(
      t => t.isCredit
    ).reduce(
      (total: number, t: IMonthTransaction) => total + t.calcSubtotal(),
      0
    )
  }

  calcTotalDebit(): number {
    return this.transactions.filter(
      t => !t.isCredit
    ).reduce(
      (total: number, t: IMonthTransaction) => total + t.calcSubtotal(),
      0
    )
  }
}

export type MonthsContextType = {
  months: IMonth[]
  monthSelected: IMonth | null
  isLoading: boolean
  selectMonth: (month: IMonth) => void
  addMonth: (month: IMonth) => Promise<boolean>
  removeMonth: (month: IMonth) => Promise<boolean>
  updateMonth: (data?: any) => Promise<boolean>
  addTransaction: (transaction: IMonthTransaction) => Promise<boolean>
  removeTransaction: (transaction: IMonthTransaction) => Promise<boolean>
  updateTransaction: (transaction: IMonthTransaction) => Promise<boolean>
}
