import { formatCurrency, unformatCurrency } from "@/helpers/formatCurrency"
import { v4 as uuidv4 } from 'uuid';


export interface ITransaction {
  id: string
  name: string
  amount: number
  discount: number
  isCredit: boolean
  monthId: string
  create: () => Promise<boolean>
  delete: () => Promise<boolean>
  update: () => Promise<boolean>
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
  monthId: string

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

    this.monthId = data?.monthId
  }

  async create(): Promise<boolean> {
    console.log('to create', JSON.stringify({
      name: this.name,
      amount: this.amount,
      discount: this.discount,
      isCredit: this.isCredit,
      monthId: this.monthId
    }))
    try {
      const res = await fetch("/api/transaction", {
        method: "POST",
        body: JSON.stringify({
          name: this.name,
          amount: this.amount,
          discount: this.discount,
          isCredit: this.isCredit,
          monthId: this.monthId
        })
      })
      if (res.status != 201) {
        return false
      }
      const {id} = await res.json()
      this.id = id

      return true
    } catch(err) {
      return false
    }
  }

  async delete(): Promise<boolean> {
    try {
      const res = await fetch(`/api/transaction/${this.id}`, {
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
      const res = await fetch(`/api/transaction/${this.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          name: this.name,
          amount: this.amount,
          discount: this.discount,
          isCredit: this.isCredit,
        })
      })
      if (res.status != 200) {
        return false
      }

      return true
    } catch(err) {
      return false
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
  transactions: ITransaction[]
  addTransaction: (transaction: ITransaction) => void
  removeTransaction: (transaction: ITransaction) => void
  updateTransaction: (transaction: ITransaction) => void
}
