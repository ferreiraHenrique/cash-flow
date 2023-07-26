import { useContext, useRef } from "react";
import Modal from "../Modal";
import { FormHandles } from "@unform/core";
import ModalReceiptForm from "./form";
import Swal from "sweetalert2";
import { ReceiptsContext } from "@/contexts/ReceiptContext";
import { Receipt, ReceiptsContextType } from "@/types/receipt";


export default function ModalNewReceipt() {
  const { addReceipt } = useContext(ReceiptsContext) as ReceiptsContextType

  const formRef = useRef<FormHandles | null>(null)
  const handleFormSubmit = async (data: any) => {
    Swal.fire({ text: 'Criando receita', showConfirmButton: false })
    Swal.showLoading()

    const created = await addReceipt(new Receipt(data))
    if (!created) {
      Swal.fire("Ops", "não foi possível criar a receita", "error")
      return
    }

    Swal.close()
  }

  return <Modal
    title="Criar nova receita"
    confirmButtonText="Adicionar receita"
    onConfirm={() => formRef?.current?.submitForm()}
    content={
      <ModalReceiptForm
        formRef={formRef}
        handleFormSubmit={handleFormSubmit}
      />
    }
  />
}
