
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { formatCurrency } from "@/helpers/formatCurrency";
import { YearsContext } from "@/contexts/YearContext";
import { YearsContextType } from "@/types/year";
import { CreditCard, CreditCardsContextType } from "@/types/creditCard";
import { CreditCardsContext } from "@/contexts/CreditCardContext";
import Button from "../Button";
import { ModalContext } from "@/contexts/ModalContext";
import { ModalContextType } from "@/types/modal";
import ModalNewPurchase from "../ModalPurchase/new";
import { formatDate } from "@/helpers/formatDate";


export default function PurchaseList() {
  const grid = "grid grid-cols-6 gap-4"

  const { creditCards, isLoading } = useContext(CreditCardsContext) as CreditCardsContextType
  const { toggleModal } = useContext(ModalContext) as ModalContextType

  if (isLoading) {
    return <></>
  }

  const currentCard = creditCards[0]

  return (
    <>
      <div className="bg-white rounded-xl py-4 px-4 mt-5 shadow-xl">
        <h5 className="font-semibold opacity-60 mb-2">
          Compras ({currentCard.name}: {currentCard.lastNumbers})
          <Button
            text="Nova compra"
            onClick={() => {
              toggleModal()
            }}
          />
        </h5>

        <div className={`${grid} opacity-60 text-sm`}>
          <span>Nome</span>
          <span className="text-right">Data</span>
          <span className="text-right">Primeira parcela</span>
          <span className="text-right">Valor</span>
          <span className="text-right">N. parcelas</span>
        </div>
        <hr className="mt-4 mb-2" />

        <div className="max-h-96 overflow-y-scroll">
          {currentCard.purchases.map(p => (
            <>
              <li className={`${grid} opacity-80 text-sm`}>
                <span>{p.name}</span>
                <span className="text-right">{formatDate(p.date)}</span>
                <span className="text-right">{formatDate(p.firstDueDate)}</span>
                <span className="text-right">{formatCurrency(p.amount)}</span>
                <span className="text-right">{p.numberOfInstallments}</span>
                {/* <span className="text-right">{formatCurrency(m.calcTotalCredit())}</span>
                <span className="text-right">{formatCurrency(m.calcTotalDebit())}</span>
                <span className="text-right">{formatCurrency(m.calcTotalCredit() - m.calcTotalDebit())}</span>
                <div className="flex justify-center gap-4">
                  <a
                    className="opacity-60 hover:opacity-80 transition-all ease-in duration-250"
                    href={`/periodos/meses/${currentCard.id}/${m.id}`}
                  >
                    <FontAwesomeIcon icon={faShare} />
                  </a>
                </div> */}
              </li>
              <hr className="my-2" />
            </>
          ))}
        </div>
      </div>

      <ModalNewPurchase />
    </>
  )
}
