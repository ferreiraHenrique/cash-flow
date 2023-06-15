import { IMonth, Month, MonthsContextType } from "@/types/month";
import Modal from "../Modal";
import ModalMonthForm from "./form";
import { useContext, useRef } from "react";
import { MonthsContext } from "@/contexts/MonthContext";


export default function ModalUpdateMonth() {
  const {monthSelected, updateMonth} = useContext(MonthsContext) as MonthsContextType

  const formRef = useRef(null)

  const handleFormSubmit = (data: any) => {
    updateMonth(data)
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
