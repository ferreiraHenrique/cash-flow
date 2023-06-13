import { useContext, useRef } from "react";
import Modal from "../Modal";
import { TransactionsContext } from "@/contexts/TransactionsContext";
import { Transaction, TransactionsContextType } from "@/types/transaction";
import ModalTransactionForm from "./form";


export default function ModalNewTransaction() {
  const {addTransaction} = useContext(TransactionsContext) as TransactionsContextType

  const formRef = useRef(null)
  const handleFormSubmit = (data: any) => {
    const transaction = new Transaction({...data})
    addTransaction(transaction)
  }

  return <Modal
    onConfirm={() => formRef.current.submitForm()}
    title="Criar nova transação"
    confirmButtonText="Adicionar transação"
    children={
      <ModalTransactionForm
        formRef={formRef}
        handleFormSubmit={handleFormSubmit}
      />
    }
  />
}
