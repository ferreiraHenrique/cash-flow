import { unformatCurrency } from "@/helpers/formatCurrency";
import { v4 as uuidv4 } from "uuid";


export interface ICreditCardPurchaseInstallment {
  id: string
  date: Date
  name: string
  amount: number
  installmentNumber: number
  update: () => Promise<boolean>
}

export class CreditCardPurchaseInstallment implements ICreditCardPurchaseInstallment {
  id: string;
  date: Date;
  name: string;
  amount: number;
  installmentNumber: number;

  constructor(data?: any) {
    this.id = data?.id || uuidv4()

    if (data?.date instanceof Date) {
      this.date = data.date
    } else if (typeof data?.date == 'string' && data?.date.includes('T')) {
      this.date = new Date(data.date)
    } else {
      this.date = new Date(`${data.date} 00:00`)
    }

    this.name = data?.name

    if (typeof data?.amount == 'number') {
      this.amount = data.amount
    } else {
      this.amount = unformatCurrency(data?.amount.toString() || '0')
    }

    this.installmentNumber = data?.installmentNumber
  }

  async update(): Promise<boolean> {
    try {
      const res = await fetch(`/api/credit-card/purchase/installment/${this.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          amount: this.amount,
          date: this.date,
        })
      })

      if (res.status != 200) {
        return false
      }

      return true
    } catch (err) {
      return false
    }
  }
}
