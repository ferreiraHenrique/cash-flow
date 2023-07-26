import { useContext, useRef } from "react";
import Modal from "../Modal";
import { FormHandles } from "@unform/core";
import ModalFinancingInstallmentForm from "./form";
import Swal from "sweetalert2";
import { FinancingInstallment, IFinancingInstallment } from "@/types/financingInstallment";
import { formatCurrency, unformatCurrency } from "@/helpers/formatCurrency";
import { formatToInput } from "@/helpers/formatDate";
import { FinancingsContext } from "@/contexts/FinancingContext";
import { FinancingsContextType } from "@/types/financing";

interface ModalUpdateFinancingInstallmentProps {
  installment: IFinancingInstallment
}

export default function ModalUpdateFinancingInstallment(props: ModalUpdateFinancingInstallmentProps) {
  const { updateInstallment } = useContext(FinancingsContext) as FinancingsContextType
  const formRef = useRef<FormHandles | null>(null)

  const handleFormSubmit = async (data: any) => {
    Swal.fire({ text: 'Atualizando parcela', showConfirmButton: false })
    Swal.showLoading()

    const { amount, date } = data
    const installment = new FinancingInstallment({
      ...props.installment,
      amount,
      date
    })

    console.log(installment.id)
    console.log(props.installment.id)

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
