import { unformatCurrency } from "@/helpers/formatCurrency";
import { v4 as uuidv4 } from "uuid";
import { CreditCardPurchaseInstallment } from "./creditCardPurchaseInstallment";


export interface ICreditCardPurchase {
  id: string
  name: string
  numberOfInstallments: number
  amount: number
  date: Date
  creditCardId: string
  firstDueDate: Date
  installments: CreditCardPurchaseInstallment[]
  create: () => Promise<boolean>
}

export class CreditCardPurchase implements ICreditCardPurchase {
  id: string;
  name: string;
  numberOfInstallments: number;
  amount: number;
  date: Date;
  creditCardId: string;
  firstDueDate: Date;
  installments: CreditCardPurchaseInstallment[]

  constructor(data?: any) {
    this.id = data?.id || uuidv4()
    this.name = data?.name

    if (typeof data?.numberOfInstallments == 'number') {
      this.numberOfInstallments = data.numberOfInstallments
    } else {
      this.numberOfInstallments = parseInt(data?.numberOfInstallments || 1)
    }

    if (typeof data?.amount == 'number') {
      this.amount = data.amount
    } else {
      this.amount = unformatCurrency(data?.amount.toString() || '0')
    }

    if (data?.date instanceof Date) {
      this.date = data.date
    } else if (typeof data?.date == 'string' && data?.date.includes('T')) {
      this.date = new Date(data.date)
    } else {
      this.date = new Date(`${data.date} 00:00`)
    }

    if (data?.firstDueDate instanceof Date) {
      this.firstDueDate = data.firstDueDate
    } else if (typeof data?.firstDueDate == 'string' && data?.firstDueDate.includes('T')) {
      this.firstDueDate = new Date(data.firstDueDate)
    } else {
      this.firstDueDate = new Date(`${data.firstDueDate} 00:00`)
    }

    this.installments = []
    if (data?.installments) {
      this.installments = data.installments.map((i: any) => new CreditCardPurchaseInstallment(i))
    }

    this.creditCardId = data?.creditCardId
  }

  async create(): Promise<boolean> {
    try {
      const res = await fetch(`/api/credit-card/purchase/${this.creditCardId}`, {
        method: 'POST',
        body: JSON.stringify({
          name: this.name,
          amount: this.amount,
          numberOfInstallments: this.numberOfInstallments,
          date: this.date,
          firstDueDate: this.firstDueDate,
        })
      })

      if (res.status != 201) {
        return false
      }

      const { purchase } = await res.json()
      this.id = purchase.id

      return true
    } catch (err) {
      return false
    }
  }
}
