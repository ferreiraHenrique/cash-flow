import { Expense, ExpensesContextType, IExpense } from "@/types/expense";
import { createContext, useEffect, useState } from "react";


export const ExpensesContext = createContext<ExpensesContextType | null>(null)

interface ExpensesProviderProps {
  children: React.ReactNode
}

function ExpensesProvider({
  children
}: ExpensesProviderProps) {
  const [expenses, setExpenses] = useState<IExpense[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAll = async () => {
      const resp = await fetch("/api/expense")
      if (resp.status == 200) {
        const { expenses } = await resp.json()
        setExpenses(expenses.map((e: any) => new Expense(e)))
        setIsLoading(false)
      }
    }

    fetchAll()
  }, [])

  const addExpense = async (expense: IExpense) => {
    if (!await expense.create()) {
      return false
    }

    setExpenses([...expenses, expense])
    return true
  }

  return (
    <ExpensesContext.Provider value={{
      expenses,
      isLoading,
      addExpense
    }}>
      {children}
    </ExpensesContext.Provider>
  )
}

export default ExpensesProvider
