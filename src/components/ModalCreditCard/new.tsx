import { FormHandles } from "@unform/core";
import { useContext, useRef } from "react";
import Modal from "../Modal";
import ModalCreditCardForm from "./form";
import Swal from "sweetalert2";
import { CreditCardsContext } from "@/contexts/CreditCardContext";
import { CreditCard, CreditCardsContextType } from "@/types/creditCard";



export default function ModalNewCreditCard() {
  const { addCard } = useContext(CreditCardsContext) as CreditCardsContextType

  const formRef = useRef<FormHandles | null>(null)
  const handleFormSubmit = async (data: any) => {
    Swal.fire({ text: 'Criando cartão', showConfirmButton: false })
    Swal.showLoading()

    const created = await addCard(new CreditCard(data))
    if (!created) {
      Swal.fire("Ops", "não foi possível criar o cartão", "error")
      return
    }

    Swal.close()
  }

  return <Modal
    title="Criar novo cartão de crédito"
    confirmButtonText="Adicionar cartão"
    onConfirm={() => formRef?.current?.submitForm()}
    content={
      <ModalCreditCardForm
        fomrRef={formRef}
        handleFormSubmit={handleFormSubmit}
      />
    }
  />
}
