
import { IMonth, Month, MonthsContextType } from "@/types/month";
import { ITransaction } from "@/types/transaction";
import { createContext, useEffect, useState } from "react";


export const MonthsContext = createContext<MonthsContextType | null>(null)

function MonthsProvider({
  children
}: {
  children: React.ReactNode
}) {
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

  const [monthSelected, setMonthSelected] = useState<IMonth | null>(null)

  const selectMonth = (month: IMonth) => {
    setMonthSelected(month)
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

    return true
  }

  const updateMonth = async (data?: any): Promise<boolean> => {
    if(!monthSelected) return false

    if (data) {
      monthSelected.name = data.name
      if (!await monthSelected.update()) {
        return false
      }
    } else {
      data = {...monthSelected}
    }

    const swap = months.map(m => {
      if (m.id != monthSelected.id) return m
      return new Month({...data, id: monthSelected.id})
    })

    setMonths(swap)

    return true
  }

  const addTransaction = async (transaction: ITransaction): Promise<boolean> => {
    if (!monthSelected) return false

    if (!await transaction.create()) {
      return false
    }

    monthSelected.transactions.push(transaction)
    updateMonth()

    return true
  }

  const removeTransaction = async (transaction: ITransaction): Promise<boolean> => {
    if (!monthSelected) return false

    if (!await transaction.delete()) {
      return false
    }

    monthSelected.transactions = monthSelected.transactions.filter(t => t.id != transaction.id)
    updateMonth()
    return true
  }

  const updateTransaction = async (transaction: ITransaction): Promise<boolean> => {
    if (!monthSelected) return false

    if (!await transaction.update()) {
      return false
    }

    monthSelected.transactions = monthSelected.transactions.map(
      t => {
        if (t.id != transaction.id) return t
        return transaction
      }
    )
    updateMonth()
    return true
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
