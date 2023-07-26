import { v4 as uuidv4 } from "uuid";
import { CreditCardPurchase, ICreditCardPurchase } from "./creditCardPurchase";
import { ICreditCardPurchaseInstallment } from "./creditCardPurchaseInstallment";


export interface ICreditCard {
  id: string
  name: string
  lastNumbers: string
  purchases: ICreditCardPurchase[]
  create: () => Promise<boolean>
}

export class CreditCard implements ICreditCard {
  id: string;
  name: string;
  lastNumbers: string;
  purchases: ICreditCardPurchase[];

  constructor(data?: any) {
    this.id = data?.id || uuidv4()
    this.name = data?.name
    this.lastNumbers = data?.lastNumbers
    this.purchases = data?.purchases || []
    this.purchases = []

    if (data?.purchases) {
      if (data.purchases.every((p: any) => p instanceof CreditCardPurchase)) {
        this.purchases = data.purchases
      } else {
        this.purchases = data.purchases.map((p: any) => new CreditCardPurchase(p))
      }
    }
  }

  async create(): Promise<boolean> {
    try {
      const res = await fetch("/api/credit-card", {
        method: "POST",
        body: JSON.stringify({ name: this.name, lastNumbers: this.lastNumbers })
      })
      if (res.status != 201) {
        return false
      }

      const { creditCard } = await res.json()
      this.id = creditCard.id

      return true

    } catch (err) {
      return false
    }
  }
}


export type CreditCardsContextType = {
  creditCards: ICreditCard[]
  isLoading: boolean
  addCard: (card: ICreditCard) => Promise<boolean>
  addPurchase: (purchase: ICreditCardPurchase) => Promise<boolean>
  updateInstallment: (installment: ICreditCardPurchaseInstallment) => Promise<boolean>
}
