
import { IMonth, Month, MonthsContextType } from "@/types/month";
import { getCurrentPage } from "@/types/page";
import { IMonthTransaction } from "@/types/monthTransaction";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";


export const MonthsContext = createContext<MonthsContextType | null>(null)

function MonthsProvider({
  notFetchAll,
  children
}: {
  notFetchAll?: boolean
  children: React.ReactNode
}) {
  const [months, setMonths] = useState<IMonth[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()
  const currentPage = getCurrentPage(router)

  useEffect(() => {
    const fetchAll = async () => {
      const res = await fetch("/api/month")
      if (res.status == 200) {
        const {months} = await res.json()
        setMonths(months.map((m: any) => (new Month(m))))
        setIsLoading(false)
      }
    }

    const fetchByYear = async (yearId: string) => {
      const res = await fetch(`/api/year/${yearId}`)
      if (res.status == 200) {
        const {months} = (await res.json()).year
        setMonths(months.map((m: any) => (new Month(m))))
        setIsLoading(false)
      }
    }

    if (
      currentPage.urlVariants.includes('/periodos/[id]') &&
      typeof router.query.id == 'string'
    ) {
      fetchByYear(router.query.id)
    } else {
      if (!notFetchAll) {
        fetchAll()
      }
    }
  }, [])

  const [monthSelected, setMonthSelected] = useState<IMonth | null>(null)

  const selectMonth = async (month: IMonth): Promise<boolean> => {
    const fetchData = async (): Promise<boolean> => {
      const res = await fetch(`/api/month/${month.id}`)
      if (res.status == 200) {
        const {month: data} = await res.json()
        month = new Month(data)
        setMonthSelected(month)
        return true
      }

      return false
    }

    return await fetchData()
  }

  const addMonth = async (month: IMonth) => {
    if (!await month.create()) {
      return false
    }

    setMonths([...months, month])
    return true
  }

  const removeMonth = async (month: IMonth): Promise<boolean> => {
    if (!await month.delete()) {
      return false
    }

    const filteredMonths = months.filter(m => m.id != month.id)
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

  const addTransaction = async (transaction: IMonthTransaction): Promise<boolean> => {
    if (!monthSelected) return false

    if (!await transaction.create()) {
      return false
    }

    monthSelected.transactions.push(transaction)
    updateMonth()

    return true
  }

  const removeTransaction = async (transaction: IMonthTransaction): Promise<boolean> => {
    if (!monthSelected) return false

    if (!await transaction.delete()) {
      return false
    }

    monthSelected.transactions = monthSelected.transactions.filter(t => t.id != transaction.id)
    updateMonth()
    return true
  }

  const updateTransaction = async (transaction: IMonthTransaction): Promise<boolean> => {
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
      isLoading,
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
