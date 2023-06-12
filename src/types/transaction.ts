import { unformatCurrency } from "@/helpers/formatCurrency"


export interface ITransaction {
  id: number
  name: string
  amount: number
  discount: number
  calcSubtotal: () => number
}

export class Transaction implements ITransaction {
  id: number
  name: string
  amount: number
  discount: number

  constructor(data?: any) {
    this.id = data?.id
    this.name = data?.name

    if (typeof data?.amount === 'number') {
      this.amount = data.amount
    } else {
      this.amount = unformatCurrency(data?.amount.toString() || '0')
    }

    if (typeof data?.discount === 'number') {
      this.discount = data.discount
    } else {
      this.discount = unformatCurrency(data?.discount.toString() || '0')
    }
  }

  public calcSubtotal(): number {
    return this.amount - this.discount
  }
}

export type TransactionsContextType = {
  transactions: ITransaction[],
  addTransaction: (transaction: ITransaction) => void
  removeTransaction: (transaction: ITransaction) => void
  updateTransaction: (transaction: ITransaction) => void
}
