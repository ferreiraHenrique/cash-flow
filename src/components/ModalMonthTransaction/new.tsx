import { useContext, useRef } from "react";
import Modal from "../Modal";
import { MonthTransaction } from "@/types/monthTransaction";
import ModalMonthTransactionForm from "./form";
import { MonthsContext } from "@/contexts/MonthContext";
import { MonthsContextType } from "@/types/month";
import Swal from "sweetalert2";
import { FormHandles } from "@unform/core";
import { YearsContext } from "@/contexts/YearContext";
import { YearsContextType } from "@/types/year";


export default function ModalNewMonthTransaction() {
  const {addTransaction} = useContext(MonthsContext) as MonthsContextType
  const {loadCurrentYear} = useContext(YearsContext) as YearsContextType

  const formRef = useRef<FormHandles | null>(null)
  const handleFormSubmit = async (data: any) => {
    Swal.fire({text: 'Criando transação', showConfirmButton: false})
    Swal.showLoading()

    const created = await addTransaction(new MonthTransaction({...data}))
    if (!created) {
      Swal.fire("Ops", "não foi possível criar a transação", "error")
      return
    }

    await loadCurrentYear(false)

    Swal.close()
  }

  return <Modal
    onConfirm={() => formRef?.current?.submitForm()}
    title="Criar nova transação"
    confirmButtonText="Adicionar transação"
    content={
      <ModalMonthTransactionForm
        formRef={formRef}
        handleFormSubmit={handleFormSubmit}
      />
    }
  />
}
