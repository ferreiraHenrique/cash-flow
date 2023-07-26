import { IReceipt, Receipt, ReceiptsContextType } from "@/types/receipt";
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
        const { receipts } = await resp.json()
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

  const updateReceipt = async (receipt: IReceipt) => {
    if (!await receipt.update()) {
      return false
    }

    const swap = receipts.map(r => {
      return r.id == receipt.id ? receipt : r
    })
    setReceipts([...swap])
    return true
  }

  return (
    <ReceiptsContext.Provider value={{
      receipts,
      isLoading,
      addReceipt,
      updateReceipt
    }}>
      {children}
    </ReceiptsContext.Provider>
  )
}

export default ReceiptsProvider
