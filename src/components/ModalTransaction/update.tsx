'use client'

import { ITransaction, Transaction, TransactionsContextType } from "@/types/transaction";
import Modal from "../Modal";
import { useContext, useRef } from "react";
import { formatCurrency } from "@/helpers/formatCurrency";
import { TransactionsContext } from "@/contexts/TransactionsContext";
import ModalTransactionForm from "./form";


interface ModalUpdateTransactionProps {
  transaction: ITransaction
}

export default function ModalUpdateTransaction(props: ModalUpdateTransactionProps) {
  const {updateTransaction} = useContext(TransactionsContext) as TransactionsContextType

  const formRef = useRef(null)

  const handleFormSubmit = (data: any) => {
    const transaction = new Transaction({
      id: props.transaction.id,
      ...data
    })
    updateTransaction(transaction)
  }

  return <Modal
    title="Atualizar transação"
    confirmButtonText="Salvar transação"
    onConfirm={() => formRef.current.submitForm()}
    children={<ModalTransactionForm
      formRef={formRef}
      handleFormSubmit={handleFormSubmit}
      initialData={{
        name: props.transaction.name,
        amount: formatCurrency(props.transaction.amount),
        discount: formatCurrency(props.transaction.discount),
      }}
    />}
  />
}
