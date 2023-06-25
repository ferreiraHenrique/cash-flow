import { unformatCurrency } from "@/helpers/formatCurrency";
import { v4 as uuidv4 } from "uuid";

export interface IExpense {
  id: string
  name: string
  baseAmount: number
  create: () => Promise<boolean>
}

export class Expense implements IExpense {
  id: string;
  name: string;
  baseAmount: number;

  constructor(data?: any) {
    this.id = data?.id ?? uuidv4()
    this.name = data?.name ?? ''

    if (typeof data?.baseAmount == 'number') {
      this.baseAmount = data.baseAmount
    } else {
      this.baseAmount = unformatCurrency(data?.baseAmount?.toString() ?? '0')
    }
  }

  async create(): Promise<boolean> {
    try {
      const res = await fetch("/api/expense", {
        method: "POST",
        body: JSON.stringify({
          name: this.name,
          baseAmount: this.baseAmount
        })
      })

      if (res.status != 201) {
        return false
      }

      const {expense} = await res.json()
      this.id = expense.id
      return true
    } catch(err) {
      return false
    }
  }
}

export type ExpensesContextType = {
  expenses: IExpense[]
  isLoading: boolean
  addExpense: (expense: IExpense) => Promise<boolean>
}
