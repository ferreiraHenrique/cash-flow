import { unformatCurrency } from "@/helpers/formatCurrency";
import { v4 as uuidv4 } from "uuid";

export interface IExpense {
  id: string
  name: string
  baseAmount: number
  startAt: Date
  isActive: boolean
  create: () => Promise<boolean>
  update: () => Promise<boolean>
}

export class Expense implements IExpense {
  id: string;
  name: string;
  baseAmount: number;
  startAt: Date
  isActive: boolean

  constructor(data?: any) {
    this.id = data?.id ?? uuidv4()
    this.name = data?.name ?? ''

    if (typeof data?.baseAmount == 'number') {
      this.baseAmount = data.baseAmount
    } else {
      this.baseAmount = unformatCurrency(data?.baseAmount?.toString() ?? '0')
    }

    if (data?.startAt instanceof Date) {
      this.startAt = data.startAt
    } else if (typeof data?.startAt == 'string' && data.startAt.includes('T')) {
      this.startAt = new Date(data.startAt)
    } else {
      this.startAt = new Date(`${data.startAt} 00:00`)
    }

    this.isActive = data?.isActive == true
  }

  async create(): Promise<boolean> {
    try {
      const res = await fetch("/api/expense", {
        method: "POST",
        body: JSON.stringify({
          name: this.name,
          baseAmount: this.baseAmount,
          startAt: this.startAt,
        })
      })

      if (res.status != 201) {
        return false
      }

      const { expense } = await res.json()
      this.id = expense.id
      return true
    } catch (err) {
      return false
    }
  }

  async update(): Promise<boolean> {
    try {
      const res = await fetch(`/api/expense/${this.id}`, {
        method: "PUT",
        body: JSON.stringify({ isActive: this.isActive })
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

export type ExpensesContextType = {
  expenses: IExpense[]
  isLoading: boolean
  addExpense: (expense: IExpense) => Promise<boolean>
  updateExpense: (expense: IExpense) => Promise<boolean>
}
