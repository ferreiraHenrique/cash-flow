import useLocalStorage from "@/hooks/localstorage";
import { IMonth, Month, MonthsContextType } from "@/types/month";
import { ITransaction, Transaction } from "@/types/transaction";
import { createContext, useState } from "react";


export const MonthsContext = createContext<MonthsContextType | null>(null)

function MonthsProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [localStorageTransactions, setLocalStorageTransactions] = useLocalStorage("transactions", [])
  const transactions: ITransaction[] = (localStorageTransactions || []).map((t: any) => new Transaction(t))

  const [localStorageMonths, setLocalStorageMonths] = useLocalStorage("months", [])
  const [months, setMonths] = useState<IMonth[]>((localStorageMonths || []).map(
    (m: any) => (new Month({
      ...m,
      transactions: transactions.filter(t => t.monthId == m.id)
    }))
  ))

  const [localStorageMonthSelected, setLocalStorageMonthSelected] = useLocalStorage("monthSelected", null)
  const [monthSelected, setMonthSelected] = useState<IMonth | null>(localStorageMonthSelected ? new Month(localStorageMonthSelected) : null)

  const selectMonth = (month: IMonth) => {
    setMonthSelected(month)
    setLocalStorageMonthSelected(month)
  }

  const addMonth = (month: IMonth) => {
    const newMonth = new Month({...month})
    setMonths([...months, newMonth])
    setLocalStorageMonths([...months, newMonth])
  }

  const removeMonth = () => {
    if (!monthSelected) return

    const filtredTransactions = transactions.filter(t => t.monthId != monthSelected.id)
    setLocalStorageTransactions(filtredTransactions)

    const filteredMonths = months.filter(m => m.id != monthSelected.id)
    setMonths(filteredMonths)
    setLocalStorageMonths(filteredMonths)
    setLocalStorageMonthSelected(null)
  }

  const updateMonth = (data?: any) => {
    if(!monthSelected) return

    const swap = months.map(m => {
      if (m.id != monthSelected.id) return m
      if (!data) return m

      return new Month({...data, id: monthSelected.id})
    })

    setMonths(swap)
    setLocalStorageMonths(swap)
    selectMonth(monthSelected)
  }

  const addTransaction = (transaction: ITransaction) => {
    if (!monthSelected) return

    const newTransaction = new Transaction({...transaction})
    monthSelected.transactions.push(newTransaction)

    setLocalStorageTransactions([...transactions, newTransaction])
    updateMonth()
  }

  const removeTransaction = (transaction: ITransaction) => {
    if (!monthSelected) return

    const filtered = transactions.filter(t => t.id != transaction.id)
    setLocalStorageTransactions(filtered)

    monthSelected.transactions = filtered.filter(t => t.monthId == monthSelected.id)
    updateMonth()
  }

  const updateTransaction = (transaction: ITransaction) => {
    if (!monthSelected) return

    const filtered = transactions.filter(t => t.id != transaction.id)
    const newSet = [...filtered, transaction]
    setLocalStorageTransactions(newSet)
    setLocalStorageTransactions(newSet)

    monthSelected.transactions = newSet
    updateMonth()
  }

  return (
    <MonthsContext.Provider value={{
      months,
      monthSelected,
      selectMonth,
      addMonth,
      removeMonth,
      updateMonth,
      addTransaction,
      removeTransaction,
      updateTransaction,
    }}>
      {children}
    </MonthsContext.Provider>
  )
}

export default MonthsProvider
