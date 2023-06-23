import { unformatCurrency } from '@/helpers/formatCurrency';
import { v4 as uuidv4 } from 'uuid';

export interface IReceipt {
  id: string
  name: string
  baseAmount: number
  create: () => Promise<boolean>
}

export class Receipt implements IReceipt {
  id: string;
  name: string;
  baseAmount: number;

  constructor(data?: any) {
    this.id = data?.id ?? uuidv4()
    this.name = data?.name ?? ''

    if (typeof data?.baseAmount == 'number') {
      this.baseAmount = data.baseAmount
    } else {
      this.baseAmount = unformatCurrency(data?.baseAmount?.toString() ?? '0')
    }
  }

  async create(): Promise<boolean> {
    try {
      const res = await fetch("/api/receipt", {
        method: "POST",
        body: JSON.stringify({
          name: this.name,
          baseAmount: this.baseAmount
        })
      })
      if (res.status != 201) {
        return false
      }

      const {receipt} = await res.json()
      this.id = receipt.id
      return true
    } catch(err) {
      return false
    }
  }
}

export type ReceiptsContextType = {
  receipts: IReceipt[]
  isLoading: boolean
  addReceipt: (receipt: IReceipt) => Promise<boolean>
}
