import { CreditCard, CreditCardsContextType, ICreditCard } from "@/types/creditCard";
import { createContext, useEffect, useState } from "react";


export const CreditCardsContext = createContext<CreditCardsContextType | null>(null)

interface CreditCardsProviderProps {
  children: React.ReactNode
}

function CreditCardsProvider({
  children
}: CreditCardsProviderProps) {
  const [creditCards, setCreditCards] = useState<ICreditCard[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchAll = async () => {
    const res = await fetch("/api/credit-card")
    if (res.status == 200) {
      const { creditCards: cards } = await res.json()
      setCreditCards(cards.map((c: any) => new CreditCard(c)))
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchAll()
  }, [])

  const addCard = async (card: ICreditCard) => {
    if (!await card.create()) {
      return false
    }

    setCreditCards([...creditCards, card])
    return true
  }

  return (
    <CreditCardsContext.Provider value={{
      creditCards,
      isLoading,
      addCard
    }}>
      {children}
    </CreditCardsContext.Provider>
  )
}

export default CreditCardsProvider
