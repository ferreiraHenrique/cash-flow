import { useContext, useRef, useState } from "react";
import Modal from "../Modal";
import Input from "../Input";
import { Form } from "@unform/web";
import FormInput from "../FormInput";
import { TransactionsContext } from "@/contexts/TransactionsContext";
import { ITransaction, Transaction, TransactionsContextType } from "@/types/transaction";
import {formatCurrency, unformatCurrency} from "@/helpers/formatCurrency";


export default function ModalNewTransaction() {
  const {addTransaction} = useContext(TransactionsContext) as TransactionsContextType

  const formRef = useRef(null)
  const handleFormSubmit = (data: any) => {
    console.log(data)
    const transaction = new Transaction({
      id: 0,
      name: data.transactionName,
      amount: data.transactionAmount,
      discount: data.transactionDiscount,
    })
    addTransaction(transaction)
  }

  const onConfirm = () => {
    formRef.current.submitForm()
    alert("CONFIRMOU")
  }

  const onInputAmount = (event: any) => {
    const formatted = formatCurrency(unformatCurrency(event.target.value || 0))
    event.target.value = formatted
  }

  return <Modal
    onConfirm={onConfirm}
    title="Criar nova transação"
    confirmButtonText="Adicionar transação"
    children={
      <Form ref={formRef} onSubmit={handleFormSubmit}>
        <div className="mt-2 w-full">
          <div className="mb-4">
            <FormInput name="transactionName" placeholder="Nome" />
          </div>
          <div className="mb-4">
            <FormInput name="transactionAmount" placeholder="Valor (R$)" onInput={onInputAmount} />
          </div>
          <div className="mb-4">
            <FormInput name="transactionDiscount" placeholder="Desconto (R$)" onInput={onInputAmount} />
          </div>
        </div>
      </Form>
    }
  />
}
