import useLocalStorage from "@/hooks/localstorage";
import { IMonth, Month, MonthsContextType } from "@/types/month";
import { createContext, useState } from "react";


export const MonthsContext = createContext<MonthsContextType | null>(null)

function MonthsProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [localStorageValue, setLocalStorageValue] = useLocalStorage("months", [])
  const [months, setMonths] = useState<IMonth[]>((localStorageValue || []).map(
    (m: any) => (new Month(m))
  ))

  const addMonth = (month: IMonth) => {
    const newMonth = new Month({...month})
    setMonths([...months, newMonth])
    setLocalStorageValue([...months, newMonth])
  }

  const removeMonth = (month: IMonth) => {
    const filtered = months.filter(m => m.id != month.id)
    setMonths(filtered)
    setLocalStorageValue(filtered)
  }

  return (
    <MonthsContext.Provider value={{months, addMonth, removeMonth}}>
      {children}
    </MonthsContext.Provider>
  )
}

export default MonthsProvider
