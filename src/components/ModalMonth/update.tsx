import { IMonth, Month, MonthsContextType } from "@/types/month";
import Modal from "../Modal";
import ModalMonthForm from "./form";
import { useContext, useRef } from "react";
import { MonthsContext } from "@/contexts/MonthContext";

interface ModalUpdateMonthProps {
  month: IMonth
}

export default function ModalUpdateMonth(props: ModalUpdateMonthProps) {
  const {updateMonth} = useContext(MonthsContext) as MonthsContextType

  const formRef = useRef(null)

  const handleFormSubmit = (data: any) => {
    updateMonth(new Month({id: props.month.id, ...data}))
  }

  return <Modal
    title="Atualizar mês"
    confirmButtonText="Salvar mês"
    onConfirm={() => formRef.current.submitForm()}
    children={
      <ModalMonthForm
        formRef={formRef}
        handleFormSubmit={handleFormSubmit}
        initialData={{name: props.month.name}}
      />
    }
  />
}
