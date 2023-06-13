'use client'

import { styled } from "styled-components"
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from "../Button"
import { useContext, useState} from "react"
import { ModalContext } from "@/contexts/ModalContext"
import { ModalContextType } from "@/types/modal"
import { TransactionsContext } from "@/contexts/TransactionsContext"
import { ITransaction, TransactionsContextType } from "@/types/transaction"
import {formatCurrency} from "@/helpers/formatCurrency"
import ModalNewTransaction from "../ModalTransaction/new"
import ModalUpdateTransaction from "../ModalTransaction/update"

const TransactionListHeader = styled.div``

const TransactionListFooter = styled.div``

const TransactionItemsList = styled.ul`
  max-height: 200px;
  overflow-y: scroll;
`

const TransactionItem = styled.li``

export default function TransactionList() {
  const grid = "grid grid-cols-5 gap-4"

  const [modalSelection, setModalSelection] = useState('')
  const [transactionSelected, setTransactionSelected] = useState<ITransaction | null>(null)

  const {toggleModal} = useContext(ModalContext) as ModalContextType
  const {transactions, removeTransaction} = useContext(TransactionsContext) as TransactionsContextType

  const totalAmount = transactions.reduce((total: number, t: ITransaction) => {
    if (t.isCredit) return total + t.amount
    return total - t.amount
  }, 0)

  const totalSubtotal = transactions.reduce((total: number, t: ITransaction) => {
    if (t.isCredit) return total + t.calcSubtotal()
    return total - t.calcSubtotal()
  }, 0)

  return (
    <>
      <div className="bg-white rounded-xl py-4 px-4 mt-5 shadow-xl">
        <h5 className="font-semibold opacity-60 mb-2">
          Transações
          <Button onClick={() => {setModalSelection('new'); toggleModal()}} />
        </h5>

        <TransactionListHeader
          className={`${grid} opacity-60 text-sm`}
        >
          <span>Nome</span>
          <span>Valor</span>
          <span>Desconto</span>
          <span>Subtotal</span>
        </TransactionListHeader>
        <hr className="mt-4 mb-2" />

        <TransactionItemsList>
          {transactions.map(t => (
            <>
              <TransactionItem
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
                    onClick={() => removeTransaction(t)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </a>
                </div>
              </TransactionItem>
              <hr key={`hr-${t.id}`} className="my-2" />
            </>
          ))}
        </TransactionItemsList>

        <TransactionListFooter
          className={`${grid} opacity-60 text-sm font-bold`}
        >
          <span>Total</span>
          <span>{formatCurrency(totalAmount)}</span>
          <span>{formatCurrency(transactions.reduce((total: number, t: ITransaction) => (total + t.discount), 0))}</span>
          <span>{formatCurrency(totalSubtotal)}</span>
        </TransactionListFooter>
      </div>

      {modalSelection == "new" && <ModalNewTransaction />}
      {modalSelection == "update" && transactionSelected && <ModalUpdateTransaction transaction={transactionSelected} />}
    </>
  )
}
