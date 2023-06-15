import { useContext, useRef } from "react";
import Modal from "../Modal";
import { Transaction } from "@/types/transaction";
import ModalTransactionForm from "./form";
import { MonthsContext } from "@/contexts/MonthContext";
import { MonthsContextType } from "@/types/month";


export default function ModalNewTransaction() {
  const {addTransaction} = useContext(MonthsContext) as MonthsContextType

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
