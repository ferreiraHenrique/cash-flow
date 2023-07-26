import { Financing, FinancingsContextType, IFinancing } from "@/types/financing";
import { IFinancingInstallment } from "@/types/financingInstallment";
import { createContext, useEffect, useState } from "react";


export const FinancingsContext = createContext<FinancingsContextType | null>(null)

interface FinancingsProviderProps {
  id?: string
  children: React.ReactNode
}

function FinancingsProvider({
  id,
  children
}: FinancingsProviderProps) {
  const [financings, setFinancings] = useState<IFinancing[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchCurrentId = async (id: string): Promise<IFinancing | null> => {
    const res = await fetch(`/api/financing/${id}`)
    if (res.status == 200) {
      const { financing } = await res.json()
      return new Financing(financing)
    }

    return null
  }

  useEffect(() => {
    const fetchAll = async () => {
      const res = await fetch("/api/financing")
      if (res.status == 200) {
        const { financings } = await res.json()
        setFinancings(financings.map((f: any) => new Financing(f)))
        setIsLoading(false)
      }
    }

    const fetchCurrent = async () => {
      let financing
      if (id) {
        financing = await fetchCurrentId(id)
      }

      if (financing) {
        setFinancings([financing])
      }
      setIsLoading(false)
    }

    if (id) {
      fetchCurrent()
    } else {
      fetchAll()
    }

  }, [])

  const addFinancing = async (financing: IFinancing) => {
    if (!await financing.create()) {
      return false
    }

    setFinancings([...financings, financing])
    return true
  }

  const updateInstallment = async (installment: IFinancingInstallment) => {
    if (!await installment.update()) {
      return false
    }

    const swap = financings.map(f => {
      f.installments = f.installments.map(i => i.id == installment.id ? installment : i)

      return f
    })

    setFinancings(swap)

    return true
  }

  return (
    <FinancingsContext.Provider value={{
      financings,
      isLoading,
      addFinancing,
      updateInstallment,
    }}>
      {children}
    </FinancingsContext.Provider>
  )
}

export default FinancingsProvider
