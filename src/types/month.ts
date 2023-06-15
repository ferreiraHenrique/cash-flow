import { v4 as uuidv4 } from 'uuid';
import { ITransaction, Transaction } from './transaction';

export interface IMonth {
  id: string
  name: string
  transactions: ITransaction[]
  calcTotalAmount: () => number
  calcTotalDiscount: () => number
  calcTotalSubtotal: () => number
  calcTotalCredit: () => number
  calcTotalDebit: () => number
}


export class Month implements IMonth {
  id: string
  name: string
  transactions: ITransaction[];

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
      this.transactions = data.transactions.map((t:any) => new Transaction(t))
    } else {
      this.transactions = []
    }
  }

  public calcTotalAmount(): number {
    return this.transactions.reduce((total: number, t: ITransaction) => {
      if (t.isCredit) return total + t.amount
      return total - t.amount
    }, 0)
  };

  calcTotalDiscount(): number {
    return this.transactions.reduce((total: number, t: ITransaction) => (
      total + t.discount
    ), 0)
  }

  calcTotalSubtotal(): number {
    return this.transactions.reduce((total: number, t: ITransaction) => {
      if (t.isCredit) return total + t.calcSubtotal()
      return total - t.calcSubtotal()
    }, 0)
  };

  calcTotalCredit(): number {
    return this.transactions.filter(
      t => t.isCredit
    ).reduce(
      (total: number, t: ITransaction) => total + t.amount,
      0
    )
  }

  calcTotalDebit(): number {
    return this.transactions.filter(
      t => !t.isCredit
    ).reduce(
      (total: number, t: ITransaction) => total + t.amount,
      0
    )
  }
}

export type MonthsContextType = {
  months: IMonth[]
  monthSelected: IMonth | null
  selectMonth: (month: IMonth) => void
  addMonth: (month: IMonth) => void
  removeMonth: () => void
  updateMonth: (data?: any) => void
  addTransaction: (transaction: ITransaction) => void
  removeTransaction: (transaction: ITransaction) => void
  updateTransaction: (transaction: ITransaction) => void
}
