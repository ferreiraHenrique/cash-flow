import { useContext, useRef } from "react";
import Modal from "../Modal";
import { Transaction } from "@/types/transaction";
import ModalTransactionForm from "./form";
import { MonthsContext } from "@/contexts/MonthContext";
import { MonthsContextType } from "@/types/month";
import Swal from "sweetalert2";


export default function ModalNewTransaction() {
  const {addTransaction} = useContext(MonthsContext) as MonthsContextType

  const formRef = useRef(null)
  const handleFormSubmit = async (data: any) => {
    Swal.fire({text: 'Criando transação', showConfirmButton: false})
    Swal.showLoading()

    const created = await addTransaction(new Transaction({...data}))
    if (!created) {
      Swal.fire("Ops", "não foi possível criar a transação", "error")
      return
    }

    Swal.close()
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
