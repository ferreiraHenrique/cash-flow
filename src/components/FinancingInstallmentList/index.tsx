import { FinancingsContext } from "@/contexts/FinancingContext"
import { formatCurrency } from "@/helpers/formatCurrency"
import { formatDate } from "@/helpers/formatDate"
import { FinancingsContextType } from "@/types/financing"
import { faEdit } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useState } from "react"
import ModalUpdateFinancingInstallment from "../ModalFinancingInstallment/update"
import { ModalContext } from "@/contexts/ModalContext"
import { ModalContextType } from "@/types/modal"
import { IFinancingInstallment } from "@/types/financingInstallment"



export default function FinancingInstallmentList() {
  const grid = "grid grid-cols-5 gap-4"

  const { toggleModal } = useContext(ModalContext) as ModalContextType
  const { financings, isLoading } = useContext(FinancingsContext) as FinancingsContextType
  const [installment, setInstallment] = useState<IFinancingInstallment | null>(null)

  if (isLoading) {
    return <></>
  }

  const current = financings[0]

  return (
    <>
      <div className="bg-white rounded-xl py-4 px-4 mt-5 shadow-xl">
        <h5 className="font-semibold opacity-60 mb-2">
          Financiamento - {current.name}
        </h5>

        <div className={`${grid} opacity-60 text-sm`}>
          <span>Parcela</span>
          <span className="text-right">Valor (R$)</span>
          <span className="text-right">Data</span>
        </div>
        <hr className="mt-4 mb-2" />

        <div className="max-h-96 overflow-y-scroll">
          {current.installments.map(i => (
            <>
              <div
                key={`financing-installment-li-${i.id}`}
                className={`${grid} opacity-80 text-sm`}
              >
                <span>
                  {i.installmentNumber.toString().padStart(2, '0')}/
                  {current.numberOfInstallments.toString().padStart(2, '0')}</span>
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

      {installment && <ModalUpdateFinancingInstallment installment={installment} />}
    </>
  )
}
