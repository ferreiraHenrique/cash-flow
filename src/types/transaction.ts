import { formatCurrency, unformatCurrency } from "@/helpers/formatCurrency"
import { v4 as uuidv4 } from 'uuid';


export interface ITransaction {
  id: string
  name: string
  amount: number
  discount: number
  isCredit: boolean
  displayName: () => string
  calcSubtotal: () => number
  displayAmount: () => string
  displaySubtotal: () => string
}

export class Transaction implements ITransaction {
  id: string
  name: string
  amount: number
  discount: number
  isCredit: boolean

  constructor(data?: any) {
    if (data?.id) {
      this.id = data.id
    } else {
      this.id = uuidv4()
    }
    this.name = data?.name

    if (typeof data?.isCredit === 'string') {
      this.isCredit = data.isCredit == 'true'
    } else {
      this.isCredit = data?.isCredit
    }

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

  public displayName(): string {
    const transactionLabel = this.isCredit? '(crédito)' : '(débito)'
    return `${this.name} ${transactionLabel}`
  }

  public calcSubtotal(): number {
    return this.amount - this.discount
  }

  public displayAmount(): string {
    let formatted = formatCurrency(this.amount)

    if (!this.isCredit) {
      formatted = `- ${formatted}`
    }

    return formatted
  }

  public displaySubtotal(): string {
    let formatted = formatCurrency(this.calcSubtotal())

    if (!this.isCredit) {
      formatted = `- ${formatted}`
    }

    return formatted
  }
}

export type TransactionsContextType = {
  transactions: ITransaction[],
  addTransaction: (transaction: ITransaction) => void
  removeTransaction: (transaction: ITransaction) => void
  updateTransaction: (transaction: ITransaction) => void
}
