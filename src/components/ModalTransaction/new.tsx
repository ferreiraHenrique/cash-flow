import { useContext, useRef } from "react";
import Modal from "../Modal";
import { Form } from "@unform/web";
import FormInput from "../FormInput";
import { TransactionsContext } from "@/contexts/TransactionsContext";
import { Transaction, TransactionsContextType } from "@/types/transaction";
import {formatCurrency, unformatCurrency} from "@/helpers/formatCurrency";


export default function ModalNewTransaction() {
  const {addTransaction} = useContext(TransactionsContext) as TransactionsContextType

  const formRef = useRef(null)
  const handleFormSubmit = (data: any) => {
    const transaction = new Transaction({
      id: 0,
      ...data
    })
    addTransaction(transaction)
  }

  const onInputAmount = (event: any) => {
    const formatted = formatCurrency(unformatCurrency(event.target.value || 0))
    event.target.value = formatted
  }

  return <Modal
    onConfirm={() => formRef.current.submitForm()}
    title="Criar nova transação"
    confirmButtonText="Adicionar transação"
    children={
      <Form ref={formRef} onSubmit={handleFormSubmit}>
        <div className="mt-2 w-full">
          <div className="mb-4">
            <FormInput name="name" placeholder="Nome" />
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
