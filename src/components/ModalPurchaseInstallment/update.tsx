import { useContext, useRef } from "react";
import Modal from "../Modal";
import { FormHandles } from "@unform/core";
import ModalFinancingInstallmentForm from "./form";
import Swal from "sweetalert2";
import { formatCurrency } from "@/helpers/formatCurrency";
import { formatToInput } from "@/helpers/formatDate";
import { CreditCardPurchaseInstallment, ICreditCardPurchaseInstallment } from "@/types/creditCardPurchaseInstallment";
import { CreditCardsContext } from "@/contexts/CreditCardContext";
import { CreditCardsContextType } from "@/types/creditCard";

interface ModalUpdatePurchaseInstallmentProps {
  installment: ICreditCardPurchaseInstallment
}

export default function ModalUpdatePurchaseInstallment(props: ModalUpdatePurchaseInstallmentProps) {
  const { updateInstallment } = useContext(CreditCardsContext) as CreditCardsContextType
  const formRef = useRef<FormHandles | null>(null)

  const handleFormSubmit = async (data: any) => {
    Swal.fire({ text: 'Atualizando parcela', showConfirmButton: false })
    Swal.showLoading()

    const { amount, date } = data
    const installment = new CreditCardPurchaseInstallment({
      ...props.installment,
      amount,
      date
    })

    if (!await updateInstallment(installment)) {
      Swal.fire("Ops", "não foi possível atualizar a parcela", "error")
      return
    }

    Swal.close()
  }

  return <Modal
    title="Atualizar parcela"
    confirmButtonText="Salvar parcela"
    onConfirm={() => formRef?.current?.submitForm()}
    content={
      <ModalFinancingInstallmentForm
        formRef={formRef}
        handleFormSubmit={handleFormSubmit}
        initialData={{ amount: formatCurrency(props.installment.amount), date: formatToInput(props.installment.date) }}
      />
    }
  />
}
