import { unformatCurrency } from "@/helpers/formatCurrency";
import { v4 as uuidv4 } from "uuid";
import { FinancingInstallment, IFinancingInstallment } from "./financingInstallment";


export interface IFinancing {
  id: string
  name: string
  numberOfInstallments: number
  amount: number
  firstDueDate: Date
  installments: IFinancingInstallment[]
  create: () => Promise<boolean>
}

export class Financing implements IFinancing {
  id: string
  name: string
  numberOfInstallments: number
  amount: number
  firstDueDate: Date
  installments: IFinancingInstallment[];

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

    if (data?.firstDueDate instanceof Date) {
      this.firstDueDate = data.firstDueDate
    } else if (typeof data?.firstDueDate == 'string' && data?.firstDueDate.includes('T')) {
      this.firstDueDate = new Date(data.firstDueDate)
    } else {
      this.firstDueDate = new Date(`${data.firstDueDate} 00:00`)
    }

    this.installments = []
    if (data?.installments) {
      this.installments = data.installments.map((i: any) => new FinancingInstallment(i))
    }
  }

  async create(): Promise<boolean> {
    try {
      const res = await fetch(`/api/financing`, {
        method: 'POST',
        body: JSON.stringify({
          name: this.name,
          amount: this.amount,
          numberOfInstallments: this.numberOfInstallments,
          firstDueDate: this.firstDueDate,
        })
      })

      if (res.status != 201) {
        return false
      }

      return true
    } catch (err) {
      return false
    }
  }
}


export type FinancingsContextType = {
  financings: IFinancing[]
  isLoading: boolean
  addFinancing: (financing: IFinancing) => Promise<boolean>
  updateInstallment: (installment: IFinancingInstallment) => Promise<boolean>
}
