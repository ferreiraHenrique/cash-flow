import { IReceipt, Receipt, ReceiptsContextType } from "@/types/receipts";
import { createContext, useEffect, useState } from "react";


export const ReceiptsContext = createContext<ReceiptsContextType | null>(null)

interface ReceiptsProviderProps {
  children: React.ReactNode
}

function ReceiptsProvider({
  children
}: ReceiptsProviderProps) {
  const [receipts, setReceipts] = useState<IReceipt[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAll = async () => {
      const resp = await fetch("/api/receipt")
      if (resp.status == 200) {
        const {receipts} = await resp.json()
        setReceipts(receipts.map((r: any) => new Receipt(r)))
        setIsLoading(false)
      }
    }

    fetchAll()
  }, [])

  const addReceipt = async (receipt: IReceipt) => {
    if (!await receipt.create()) {
      return false
    }

    setReceipts([...receipts, receipt])
    return true
  }

  return (
    <ReceiptsContext.Provider value={{
      receipts,
      isLoading,
      addReceipt
    }}>
      {children}
    </ReceiptsContext.Provider>
  )
}

export default ReceiptsProvider
