import { useContext, useRef } from "react";
import Modal from "../Modal";
import Swal from "sweetalert2";
import { FormHandles } from "@unform/core";
import ModalYearForm from "./form";
import { YearsContext } from "@/contexts/YearContext";
import { Year, YearsContextType } from "@/types/year";


export default function ModalNewYear() {
  const { addYear } = useContext(YearsContext) as YearsContextType

  const formRef = useRef<FormHandles | null>(null)
  const handleFormSubmit = async (data: any) => {
    Swal.fire({ text: 'Criando período', showConfirmButton: false })
    Swal.showLoading()

    const created = await addYear(new Year({ ...data }))
    if (!created) {
      Swal.fire("Ops", "não foi possível criar o período", "error")
      return
    }

    Swal.close()
  }

  return <Modal
    title="Criar novo período"
    confirmButtonText="Adicionar período"
    onConfirm={() => formRef?.current?.submitForm()}
    content={
      <ModalYearForm
        formRef={formRef}
        handleFormSubmit={handleFormSubmit}
      />
    }
  />
}
