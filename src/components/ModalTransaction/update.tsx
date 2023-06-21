'use client'

import { ITransaction, Transaction } from "@/types/transaction";
import Modal from "../Modal";
import { useContext, useRef } from "react";
import { formatCurrency } from "@/helpers/formatCurrency";
import ModalTransactionForm from "./form";
import { MonthsContext } from "@/contexts/MonthContext";
import { MonthsContextType } from "@/types/month";
import Swal from "sweetalert2";
import { FormHandles } from "@unform/core";


interface ModalUpdateTransactionProps {
  transaction: ITransaction
}

export default function ModalUpdateTransaction(props: ModalUpdateTransactionProps) {
  const {updateTransaction} = useContext(MonthsContext) as MonthsContextType

  const formRef = useRef<FormHandles | null>(null)

  const handleFormSubmit = async (data: any) => {
    Swal.fire({text: 'Atualizando transação', showConfirmButton: false})
    Swal.showLoading()

    const transaction = new Transaction({
      id: props.transaction.id,
      ...data
    })

    if (!await updateTransaction(transaction)) {
      Swal.fire("Ops", "não foi possível atualizar a transação", "error")
      return
    }

    Swal.close()
  }

  return <Modal
    title="Atualizar transação"
    confirmButtonText="Salvar transação"
    onConfirm={() => formRef?.current?.submitForm()}
    content={<ModalTransactionForm
      formRef={formRef}
      handleFormSubmit={handleFormSubmit}
      initialData={{
        name: props.transaction.name,
        amount: formatCurrency(props.transaction.amount),
        discount: formatCurrency(props.transaction.discount),
        isCredit: props.transaction.isCredit,
      }}
    />}
  />
}
