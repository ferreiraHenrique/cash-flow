import { v4 as uuidv4 } from "uuid";


export interface ICreditCard {
  id: string
  name: string
  lastNumbers: string
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
}
