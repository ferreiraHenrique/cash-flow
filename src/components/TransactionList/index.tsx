'use client'

import { styled } from "styled-components"
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from "../Button"
import { useContext} from "react"
import ModalNewTransaction from "../ModalNewTransaction"
import ModalProvider, { ModalContext } from "@/contexts/ModalContext"
import { ModalContextType } from "@/types/modal"

const TransactionListHeader = styled.div``

const TransactionListFooter = styled.div``

const TransactionItemsList = styled.ul`
  max-height: 200px;
  overflow-y: scroll;
`

const TransactionItem = styled.li``

export default function TransactionList() {
  const grid = "grid grid-cols-5 gap-4"

  const {toggleModal} = useContext(ModalContext) as ModalContextType

  return (
    <>
      <div className="bg-white rounded-xl py-4 px-4 mt-5 shadow-xl">
        <h5 className="font-semibold opacity-60 mb-2">
          Transações
          <Button onClick={toggleModal} />
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
          <>
            <TransactionItem
              className={`${grid} opacity-80 text-sm`}
            >
              <span>Aluguel</span>
              <span>R$ 1.500,00</span>
              <span>R$ 0,00</span>
              <span>R$ 1.500,00</span>
              <div className="flex justify-center gap-4">
                <a href="#" className="opacity-60 hover:opacity-80 transition-all ease-in duration-250">
                  <FontAwesomeIcon icon={faEdit} />
                </a>
                <a href="#" className="opacity-60 hover:opacity-80 hover:text-red-600 transition-all ease-in duration-250">
                  <FontAwesomeIcon icon={faTrash} />
                </a>
              </div>
            </TransactionItem>
            <hr className="my-2" />
          </>

          <>
            <TransactionItem
              className={`${grid} opacity-80 text-sm`}
            >
              <span>Condomínio</span>
              <span>R$ 495,11</span>
            </TransactionItem>
            <hr className="my-2" />
          </>

          <>
            <TransactionItem
              className={`${grid} opacity-80 text-sm`}
            >
              <span>CPFL</span>
              <span>R$ 120,00</span>
            </TransactionItem>
            <hr className="my-2" />
          </>
        </TransactionItemsList>

        <TransactionListFooter
          className={`${grid} opacity-60 text-sm font-bold`}
        >
          <span>Total</span>
          <span>R$ 9999,99</span>
          <span>R$ 9999,99</span>
          <span>R$ 9999,99</span>
        </TransactionListFooter>
      </div>

      <ModalNewTransaction />
    </>
  )
}
