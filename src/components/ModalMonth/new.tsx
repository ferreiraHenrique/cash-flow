import { useContext, useRef } from "react";
import Modal from "../Modal";
import ModalMonthForm from "./form";
import { MonthsContext } from "@/contexts/MonthContext";
import { Month, MonthsContextType } from "@/types/month";


export default function ModalNewMonth() {
  const {addMonth} = useContext(MonthsContext) as MonthsContextType

  const formRef = useRef(null)
  const handleFormSubmit = (data: any) => {
    addMonth(new Month({...data}))
  }

  return <Modal
    title="Criar novo mês"
    confirmButtonText="Adicionar mês"
    onConfirm={() => formRef.current.submitForm()}
    children={
      <ModalMonthForm
        formRef={formRef}
        handleFormSubmit={handleFormSubmit}
      />
    }
  />
}
