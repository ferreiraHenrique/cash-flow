'use client'

import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from "../Button"
import { useContext, useState } from "react"
import { ModalContext } from "@/contexts/ModalContext"
import { ModalContextType } from "@/types/modal"
import { IMonthTransaction } from "@/types/monthTransaction"
import { formatCurrency } from "@/helpers/formatCurrency"
import ModalNewMonthTransaction from "../ModalMonthTransaction/new"
import ModalUpdateMonthTransaction from "../ModalMonthTransaction/update"
import { MonthsContext } from "@/contexts/MonthContext"
import { MonthsContextType } from "@/types/month"
import Swal from 'sweetalert2'
import NotFound from '../NotFound'


export default function TransactionList() {
  const grid = "grid grid-cols-5 gap-4"

  const [modalSelection, setModalSelection] = useState('')
  const [transactionSelected, setTransactionSelected] = useState<IMonthTransaction | null>(null)

  const { toggleModal } = useContext(ModalContext) as ModalContextType
  const { monthSelected, removeTransaction } = useContext(MonthsContext) as MonthsContextType

  const handleRemove = async (t: IMonthTransaction) => {
    Swal.fire({ text: "Excluindo transação", showConfirmButton: false })
    Swal.showLoading()

    if (!await removeTransaction(t)) {
      Swal.fire("Ops", "não foi possível remover a transação", "error")
      return
    }

    Swal.close()
  }

  if (!monthSelected) {
    return (
      <div className='bg-white rounded-xl grid justify-center text-center p-10'>
        <h2 className="opacity-40"><i>Sem registros cadastrados</i></h2>
        <NotFound />
      </div>
    )
  }

  return (
    <>
      <div className="bg-white rounded-xl py-4 px-4 mt-5 shadow-xl">
        <h5 className="font-semibold opacity-60 mb-2">
          Transações ({monthSelected.name})
          <Button
            text="Novo"
            onClick={() => { setModalSelection('new'); toggleModal() }}
          />
        </h5>

        <div
          className={`${grid} opacity-60 text-sm`}
        >
          <span>Nome</span>
          <span className='text-right'>Valor</span>
          <span className='text-right'>Desconto</span>
          <span className='text-right'>Subtotal</span>
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
                <span className='text-right'>{t.displayAmount()}</span>
                <span className='text-right'>{formatCurrency(t.discount)}</span>
                <span className='text-right'>{t.displaySubtotal()}</span>
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
          <span className='text-right'>{formatCurrency(monthSelected?.calcTotalAmount() || 0)}</span>
          <span className='text-right'>{formatCurrency(monthSelected?.calcTotalDiscount() || 0)}</span>
          <span className='text-right'>{formatCurrency(monthSelected?.calcTotalSubtotal() || 0)}</span>
        </div>
      </div>

      {modalSelection == "new" && <ModalNewMonthTransaction />}
      {modalSelection == "update" && transactionSelected && <ModalUpdateMonthTransaction transaction={transactionSelected} />}
    </>
  )
}
