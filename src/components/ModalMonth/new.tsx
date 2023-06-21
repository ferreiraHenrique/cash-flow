import { useContext, useRef } from "react";
import Modal from "../Modal";
import ModalMonthForm from "./form";
import { MonthsContext } from "@/contexts/MonthContext";
import { Month, MonthsContextType } from "@/types/month";
import Swal from "sweetalert2";
import { FormHandles } from "@unform/core";


export default function ModalNewMonth() {
  const {addMonth} = useContext(MonthsContext) as MonthsContextType

  const formRef = useRef<FormHandles | null>(null)
  const handleFormSubmit = async (data: any) => {
    Swal.fire({text: 'Criando mês', showConfirmButton: false})
    Swal.showLoading()

    const created = await addMonth(new Month({...data}))
    if (!created) {
      Swal.fire("Ops", "não foi possível criar o mês", "error")
      return
    }

    Swal.close()
  }

  return <Modal
    title="Criar novo mês"
    confirmButtonText="Adicionar mês"
    onConfirm={() => formRef?.current?.submitForm()}
    content={
      <ModalMonthForm
        formRef={formRef}
        handleFormSubmit={handleFormSubmit}
      />
    }
  />
}
