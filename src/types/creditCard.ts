import { v4 as uuidv4 } from "uuid";


export interface ICreditCard {
  id: string
  name: string
  lastNumbers: string
  create: () => Promise<boolean>
}

export class CreditCard implements ICreditCard {
  id: string;
  name: string;
  lastNumbers: string;

  constructor(data?: any) {
    this.id = data?.id || uuidv4()
    this.name = data?.name
    this.lastNumbers = data?.lastNumbers
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
}
