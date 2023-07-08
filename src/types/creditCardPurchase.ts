import { v4 as uuidv4 } from "uuid";


export interface ICreditCardPurchase {
  id: string
  name: string
  numberOfInstallments: number
  amount: number
  date: Date
}

export class CreditCardPurchase implements ICreditCardPurchase {
  id: string;
  name: string;
  numberOfInstallments: number;
  amount: number;
  date: Date;

  constructor(data?: any) {
    this.id = data?.id || uuidv4()
    this.name = data?.name
    this.numberOfInstallments = data?.numberOfInstallments
    this.amount = data?.amount
    this.date = data?.date
  }
}
