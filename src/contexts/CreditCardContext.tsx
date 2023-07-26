import { CreditCard, CreditCardsContextType, ICreditCard } from "@/types/creditCard";
import { ICreditCardPurchase } from "@/types/creditCardPurchase";
import { createContext, useEffect, useState } from "react";


export const CreditCardsContext = createContext<CreditCardsContextType | null>(null)

interface CreditCardsProviderProps {
  id?: string
  children: React.ReactNode
}

function CreditCardsProvider({
  id,
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

  const fetchCurrentId = async (id: string): Promise<ICreditCard | null> => {
    const res = await fetch(`/api/credit-card/${id}`)
    if (res.status == 200) {
      const { creditCard } = await res.json()
      return new CreditCard(creditCard)
    }

    return null
  }

  useEffect(() => {
    const fetchCurrent = async () => {
      let card
      if (id) {
        card = await fetchCurrentId(id)
      }

      if (card) {
        setCreditCards([card])
        setIsLoading(false)
      }
    }

    if (id) {
      fetchCurrent()
    } else {
      fetchAll()
    }
  }, [])

  const addCard = async (card: ICreditCard) => {
    if (!await card.create()) {
      return false
    }

    setCreditCards([...creditCards, card])
    return true
  }

  const addPurchase = async (purchase: ICreditCardPurchase): Promise<boolean> => {
    const currentCard = creditCards[0]
    purchase.creditCardId = currentCard.id

    if (!await purchase.create()) {
      return false
    }

    currentCard.purchases.push(purchase)
    setCreditCards([currentCard])

    return true
  }

  return (
    <CreditCardsContext.Provider value={{
      creditCards,
      isLoading,
      addCard,
      addPurchase
    }}>
      {children}
    </CreditCardsContext.Provider>
  )
}

export default CreditCardsProvider
