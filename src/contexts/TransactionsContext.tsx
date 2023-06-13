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
    const newTransaction = new Transaction({...transaction})
    setTransactions([...transactions, newTransaction])
    setLocalStorageValue([...transactions, newTransaction])
  }

  const removeTransaction = (transaction: ITransaction) => {
    const filtered = transactions.filter(t => t.id != transaction.id)
    setTransactions(filtered)
    setLocalStorageValue(filtered)
  }

  const updateTransaction = (transaction: ITransaction) => {
    const filtered = transactions.filter(t => t.id != transaction.id)
    setTransactions([...filtered, transaction])
    setLocalStorageValue([...filtered, transaction])
  }

  return (
    <TransactionsContext.Provider value={{transactions, addTransaction, removeTransaction, updateTransaction}}>
      {children}
    </TransactionsContext.Provider>
  )
}

export default TransactionsProvider
