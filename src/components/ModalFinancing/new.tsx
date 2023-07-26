import { useContext, useRef } from "react";
import Modal from "../Modal";
import { FormHandles } from "@unform/core";
import ModalFinancingForm from "./form";
import Swal from "sweetalert2";
import { FinancingsContext } from "@/contexts/FinancingContext";
import { Financing, FinancingsContextType } from "@/types/financing";


export default function ModalNewFinancing() {
  const { addFinancing } = useContext(FinancingsContext) as FinancingsContextType
  const formRef = useRef<FormHandles | null>(null)

  const handleFormSubmit = async (data: any) => {
    Swal.fire({ text: "Criando financiamento", showConfirmButton: false })
    Swal.showLoading()

    if (!await addFinancing(new Financing(data))) {
      Swal.fire("Ops", "não foi possível criar o financiamento", "error")
      return
    }

    Swal.close()
  }

  return <Modal
    title="Criar novo financiamento"
    confirmButtonText="Adicionar financiamento"
    onConfirm={() => formRef?.current?.submitForm()}
    content={
      <ModalFinancingForm
        formRef={formRef}
        handleFormSubmit={handleFormSubmit}
      />
    }
  />
}
