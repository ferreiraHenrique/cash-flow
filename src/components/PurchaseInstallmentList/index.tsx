import { CreditCardsContext } from "@/contexts/CreditCardContext"
import { ModalContext } from "@/contexts/ModalContext"
import { formatCurrency } from "@/helpers/formatCurrency"
import { formatDate } from "@/helpers/formatDate"
import { CreditCardsContextType } from "@/types/creditCard"
import { ICreditCardPurchaseInstallment } from "@/types/creditCardPurchaseInstallment"
import { ModalContextType } from "@/types/modal"
import { faEdit } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useState } from "react"
import ModalUpdatePurchaseInstallment from "../ModalPurchaseInstallment/update"

interface PurchaseInstallmentListProps {
  purchaseId: string
}

export default function PurchaseInstallmentList(props: PurchaseInstallmentListProps) {
  const grid = "grid grid-cols-4 gap-4"

  const { toggleModal } = useContext(ModalContext) as ModalContextType
  const { creditCards, isLoading } = useContext(CreditCardsContext) as CreditCardsContextType
  const [installment, setInstallment] = useState<ICreditCardPurchaseInstallment | null>(null)

  if (isLoading) return <></>

  const card = creditCards[0]
  const purchase = card.purchases.filter((p) => p.id == props.purchaseId)[0]

  return (
    <>
      <div className="bg-white rounded-xl py-4 px-4 mt-5 shadow-xl">
        <h5 className="font-semibold opacity-60 mb-2">
          Compra ({card.name}: {purchase.name})
        </h5>

        <div className={`${grid} opacity-60 text-sm`}>
          <span>Parcela</span>
          <span className="text-right">Valor (R$)</span>
          <span className="text-right">Data</span>
        </div>
        <hr className="mt-4 mb-2" />

        <div className="max-h-96 overflow-y-scroll">
          {purchase.installments.map(i => (
            <>
              <div
                key={`purchase-installment-li-${i.id}`}
                className={`${grid} opacity-80 text-sm`}
              >
                <span>
                  {i.installmentNumber.toString().padStart(2, '0')}/
                  {purchase.numberOfInstallments.toString().padStart(2, '0')}
                </span>
                <span className="text-right">{formatCurrency(i.amount)}</span>
                <span className="text-right">{formatDate(i.date)}</span>
                <div className="flex justify-center gap-4">
                  <a
                    className="opacity-60 hover:opacity-80 transition-all ease-in duration-250"
                  >
                    <FontAwesomeIcon
                      icon={faEdit}
                      onClick={() => {
                        setInstallment(i)
                        toggleModal()
                      }}
                    />
                  </a>
                </div>
              </div>

              <hr className="my-2" />
            </>
          ))}
        </div>
      </div>

      {installment && <ModalUpdatePurchaseInstallment installment={installment} />}
    </>
  )
}
