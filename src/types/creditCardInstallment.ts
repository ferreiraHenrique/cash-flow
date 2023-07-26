import { v4 as uuidv4 } from "uuid";


export interface ICreditCardInstallment {
  id: string
  date: Date
  name: string
  amount: number
  installmentNumber: number
}

export class CreditCardInstallment implements ICreditCardInstallment {
  id: string;
  date: Date;
  name: string;
  amount: number;
  installmentNumber: number;

  constructor(data?: any) {
    this.id = data?.id || uuidv4()
    this.date = data?.date
    this.name = data?.name
    this.amount = data?.amount
    this.installmentNumber = data?.installmentNumber
  }
}
