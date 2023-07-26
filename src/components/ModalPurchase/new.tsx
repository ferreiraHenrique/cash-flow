import { useContext, useRef } from "react";
import Modal from "../Modal";
import Swal from "sweetalert2";
import { FormHandles } from "@unform/core";
import ModalYearForm from "./form";
import { CreditCardPurchase } from "@/types/creditCardPurchase";
import { CreditCardsContext } from "@/contexts/CreditCardContext";
import { CreditCardsContextType } from "@/types/creditCard";


export default function ModalNewPurchase() {
  const { addPurchase } = useContext(CreditCardsContext) as CreditCardsContextType

  const formRef = useRef<FormHandles | null>(null)
  const handleFormSubmit = async (data: any) => {
    Swal.fire({ text: 'Criando compra', showConfirmButton: false })
    Swal.showLoading()
    console.log(data)
    console.log(new CreditCardPurchase(data))

    if (! await addPurchase(new CreditCardPurchase(data))) {
      Swal.fire("Ops", "não foi possível criar a compra", "error")
      return
    }

    Swal.close()
  }

  return <Modal
    title="Criar nova compra"
    confirmButtonText="Adicionar compra"
    onConfirm={() => formRef?.current?.submitForm()}
    content={
      <ModalYearForm
        formRef={formRef}
        handleFormSubmit={handleFormSubmit}
      />
    }
  />
}
