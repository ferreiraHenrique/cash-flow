'use client'

import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from "../Button"
import { useContext, useState} from "react"
import { ModalContext } from "@/contexts/ModalContext"
import { ModalContextType } from "@/types/modal"
import { ITransaction } from "@/types/transaction"
import {formatCurrency} from "@/helpers/formatCurrency"
import ModalNewTransaction from "../ModalTransaction/new"
import ModalUpdateTransaction from "../ModalTransaction/update"
import { MonthsContext } from "@/contexts/MonthContext"
import { MonthsContextType } from "@/types/month"
import Swal from 'sweetalert2'


export default function TransactionList() {
  const grid = "grid grid-cols-5 gap-4"

  const [modalSelection, setModalSelection] = useState('')
  const [transactionSelected, setTransactionSelected] = useState<ITransaction | null>(null)

  const {toggleModal} = useContext(ModalContext) as ModalContextType
  const {monthSelected, removeTransaction} = useContext(MonthsContext) as MonthsContextType

  const handleRemove = async (t: ITransaction) => {
    Swal.fire({text: "Excluindo transação", showConfirmButton: false})
    Swal.showLoading()

    if (!await removeTransaction(t)) {
      Swal.fire("Ops", "não foi possível remover a transação", "error")
      return
    }

    Swal.close()
  }

  if (!monthSelected) {
    return <></>
  }

  return (
    <>
      <div className="bg-white rounded-xl py-4 px-4 mt-5 shadow-xl">
        <h5 className="font-semibold opacity-60 mb-2">
          Transações ({monthSelected.name})
          <Button
            text="Novo"
            onClick={() => {setModalSelection('new'); toggleModal()}}
          />
        </h5>

        <div
          className={`${grid} opacity-60 text-sm`}
        >
          <span>Nome</span>
          <span>Valor</span>
          <span>Desconto</span>
          <span>Subtotal</span>
        </div>
        <hr className="mt-4 mb-2" />

        <ul className="max-h-52 overflow-y-scroll">
          {monthSelected && monthSelected.transactions.map(t => (
            <>
              <li
                className={`${grid} opacity-80 text-sm`}
                key={t.id}
              >
                <span>{t.displayName()}</span>
                <span>{t.displayAmount()}</span>
                <span>{formatCurrency(t.discount)}</span>
                <span>{t.displaySubtotal()}</span>
                <div className="flex justify-center gap-4">
                  <a
                    href="#"
                    className="opacity-60 hover:opacity-80 transition-all ease-in duration-250"
                    onClick={() => {
                      setTransactionSelected(t);
                      setModalSelection('update');
                      toggleModal()
                    }}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </a>
                  <a
                    href="#"
                    className="opacity-60 hover:opacity-80 hover:text-red-600 transition-all ease-in duration-250"
                    onClick={() => handleRemove(t)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </a>
                </div>
              </li>
              <hr key={`hr-${t.id}`} className="my-2" />
            </>
          ))}
        </ul>

        <div
          className={`${grid} opacity-60 text-sm font-bold`}
        >
          <span>Total</span>
          <span>{formatCurrency(monthSelected?.calcTotalAmount() || 0)}</span>
          <span>{formatCurrency(monthSelected?.calcTotalDiscount() || 0)}</span>
          <span>{formatCurrency(monthSelected?.calcTotalSubtotal() || 0)}</span>
        </div>
      </div>

      {modalSelection == "new" && <ModalNewTransaction />}
      {modalSelection == "update" && transactionSelected && <ModalUpdateTransaction transaction={transactionSelected} />}
    </>
  )
}
