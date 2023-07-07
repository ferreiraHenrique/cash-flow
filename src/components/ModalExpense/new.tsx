import { useContext, useRef } from "react";
import Modal from "../Modal";
import { FormHandles } from "@unform/core";
import ModalReceiptForm from "./form";
import Swal from "sweetalert2";
import { Expense, ExpensesContextType } from "@/types/expenses";
import { ExpensesContext } from "@/contexts/ExpenseContext";


export default function ModalNewExpense() {
  const {addExpense} = useContext(ExpensesContext) as ExpensesContextType

  const formRef = useRef<FormHandles | null>(null)
  const handleFormSubmit = async (data: any) => {
    Swal.fire({text: 'Criando despesa', showConfirmButton: false})
    Swal.showLoading()

    const created = await addExpense(new Expense(data))
    if (!created) {
      Swal.fire("Ops", "não foi possível criar a despesa", "error")
      return
    }

    Swal.close()
  }

  return <Modal
    title="Criar nova despesa"
    confirmButtonText="Adicionar despesa"
    onConfirm={() => formRef?.current?.submitForm()}
    content={
      <ModalReceiptForm
        formRef={formRef}
        handleFormSubmit={handleFormSubmit}
      />
    }
  />
}
