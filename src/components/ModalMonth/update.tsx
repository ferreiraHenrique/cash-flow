import { MonthsContextType } from "@/types/month";
import Modal from "../Modal";
import ModalMonthForm from "./form";
import { useContext, useRef } from "react";
import { MonthsContext } from "@/contexts/MonthContext";
import Swal from "sweetalert2";


export default function ModalUpdateMonth() {
  const {monthSelected, updateMonth} = useContext(MonthsContext) as MonthsContextType

  const formRef = useRef(null)
  const handleFormSubmit = async (data: any) => {
    Swal.fire({text: 'Atualizando mês', showConfirmButton: false})
    Swal.showLoading()

    if (!await updateMonth(data)) {
      Swal.fire("Ops", "não foi possível atualizar o mês", "error")
      return
    }

    Swal.close()
  }

  return <Modal
    title="Atualizar mês"
    confirmButtonText="Salvar mês"
    onConfirm={() => formRef.current.submitForm()}
    children={
      <ModalMonthForm
        formRef={formRef}
        handleFormSubmit={handleFormSubmit}
        initialData={{name: monthSelected?.name}}
      />
    }
  />
}
