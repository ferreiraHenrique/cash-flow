import useLocalStorage from "@/hooks/localstorage";
import { ITransaction, Transaction, TransactionsContextType } from "@/types/transaction";
import { createContext, useState } from "react";


export const TransactionsContext = createContext<TransactionsContextType  | null>(null)

function TransactionsProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [localStorageValue, setLocalStorageValue] = useLocalStorage("transactions", [])
  const [transactions, setTransactions] = useState<ITransaction[]>((localStorageValue || []).map(
    (t:any) => (new Transaction(t))
  ))

  const addTransaction = (transaction: ITransaction) => {
    const newTransaction = new Transaction({...transaction, id: Math.random()})
    setTransactions([...transactions, newTransaction])
    setLocalStorageValue([...transactions, newTransaction])
  }

  return (
    <TransactionsContext.Provider value={{transactions, addTransaction}}>
      {children}
    </TransactionsContext.Provider>
  )
}

export default TransactionsProvider
