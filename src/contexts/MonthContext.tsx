import useLocalStorage from "@/hooks/localstorage";
import { IMonth, Month, MonthsContextType } from "@/types/month";
import { ITransaction, Transaction } from "@/types/transaction";
import { createContext, useEffect, useState } from "react";


export const MonthsContext = createContext<MonthsContextType | null>(null)

function MonthsProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [localStorageTransactions, setLocalStorageTransactions] = useLocalStorage("transactions", [])
  const transactions: ITransaction[] = (localStorageTransactions || []).map((t: any) => new Transaction(t))

  // const [localStorageMonths, setLocalStorageMonths] = useLocalStorage("months", [])
  // const [months, setMonths] = useState<IMonth[]>((localStorageMonths || []).map(
  //   (m: any) => (new Month({
  //     ...m,
  //     transactions: transactions.filter(t => t.monthId == m.id)
  //   }))
  // ))
  const [months, setMonths] = useState<IMonth[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/month")
      if (res.status == 200) {
        const {months} = await res.json()
        setMonths(months.map((m: any) => (new Month(m))))
      }
    }
    fetchData()
  }, [])

  const [localStorageMonthSelected, setLocalStorageMonthSelected] = useLocalStorage("monthSelected", null)
  const [monthSelected, setMonthSelected] = useState<IMonth | null>(localStorageMonthSelected ? new Month(localStorageMonthSelected) : null)

  const selectMonth = (month: IMonth) => {
    setMonthSelected(month)
    setLocalStorageMonthSelected(month)
  }

  const addMonth = async (month: IMonth) => {
    if (!await month.create()) {
      return false
    }

    setMonths([...months, month])
    return true
  }

  const removeMonth = async (): Promise<boolean> => {
    if (!monthSelected) return false

    if (!await monthSelected.delete()) {
      return false
    }

    const filteredMonths = months.filter(m => m.id != monthSelected.id)
    setMonths(filteredMonths)
    setLocalStorageMonthSelected(null)

    return true
  }

  const updateMonth = async (data?: any): Promise<boolean> => {
    if(!monthSelected) return false

    monthSelected.name = data.name
    if (!await monthSelected.update()) {
      return false
    }

    const swap = months.map(m => {
      if (m.id != monthSelected.id) return m
      return new Month({...data, id: monthSelected.id})
    })

    setMonths(swap)
    setLocalStorageMonthSelected(null)

    return true
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
