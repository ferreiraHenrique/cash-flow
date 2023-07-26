import { IYear, Year, YearsContextType } from "@/types/year";
import { createContext, useEffect, useState } from "react";


export const YearsContext = createContext<YearsContextType | null>(null)

interface YearsProviderProps {
  id?: string
  children: React.ReactNode
}

function YearsProvider({
  id,
  children
}: YearsProviderProps) {
  const [years, setYears] = useState<IYear[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchCurrentYear = async (): Promise<IYear | null> => {
    const currentYear = (new Date).getFullYear()
    const res = await fetch(`/api/year?byLabel=${currentYear}`)
    if (res.status == 200) {
      const { year } = await res.json()
      return new Year(year)
    }

    return null
  }

  const fetchCurrentId = async (id: string): Promise<IYear | null> => {
    const res = await fetch(`/api/year/${id}`)
    if (res.status == 200) {
      const { year } = await res.json()
      return new Year(year)
    }

    return null
  }

  useEffect(() => {
    const fetchAll = async () => {
      const res = await fetch("/api/year")
      if (res.status == 200) {
        const { years } = await res.json()
        setYears(years.map((y: any) => new Year(y)))
        setIsLoading(false)
      }
    }

    const fetchCurrent = async () => {
      let year
      if (id) {
        year = await fetchCurrentId(id)
      } else {
        year = await fetchCurrentYear()
      }

      if (year) {
        setYears([year])
      }
      setIsLoading(false)
    }

    if (id) {
      fetchCurrent()
    } else {
      fetchAll()
    }
  }, [])

  const loadCurrentYear = async (showLoading?: boolean) => {
    if (showLoading) {
      setIsLoading(true)
    }

    const year = await fetchCurrentYear()
    if (year) {
      setYears([year])
    }

    if (showLoading) {
      setIsLoading(false)
    }
  }

  const addYear = async (year: IYear) => {
    if (!await year.create()) {
      return false
    }

    setYears([...years, year])
    return true
  }

  return (
    <YearsContext.Provider value={{
      years,
      isLoading,
      loadCurrentYear,
      addYear,
    }}>
      {children}
    </YearsContext.Provider>
  )
}

export default YearsProvider
