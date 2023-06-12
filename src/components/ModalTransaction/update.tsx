'use client'

import { ITransaction, Transaction, TransactionsContextType } from "@/types/transaction";
import Modal from "../Modal";
import { Form } from "@unform/web";
import FormInput from "../FormInput";
import { useContext, useEffect, useRef } from "react";
import { formatCurrency, unformatCurrency } from "@/helpers/formatCurrency";
import { TransactionsContext } from "@/contexts/TransactionsContext";


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

  const onInputAmount = (event: any) => {
    const formatted = formatCurrency(unformatCurrency(event.target.value || 0))
    event.target.value = formatted
  }

  return <Modal
    title="Atualizar transação"
    confirmButtonText="Salvar transação"
    onConfirm={() => formRef.current.submitForm()}
    children={
      <Form
        ref={formRef}
        onSubmit={handleFormSubmit}
        initialData={{"transactionName": "Henrique"}}
      >
        <div className="mt-2 w-full">
          <div className="mb-4">
            <FormInput name="transactionName" placeholder="Nome" />
          </div>
          <div className="mb-4">
            <FormInput name="amount" placeholder="Valor (R$)" onInput={onInputAmount} />
          </div>
          <div className="mb-4">
            <FormInput name="discount" placeholder="Desconto (R$)" onInput={onInputAmount} />
          </div>
        </div>
      </Form>
    }
  />
}
