import { useContext, useState } from "react"
import Button from "../Button"
import { ModalContextType } from "@/types/modal"
import { ModalContext } from "@/contexts/ModalContext"
import { ExpensesContext } from "@/contexts/ExpenseContext"
import { ExpensesContextType } from "@/types/expense"
import ModalNewExpense from "../ModalExpense/new"
import { formatCurrency } from "@/helpers/formatCurrency"


export default function ExpenseList() {
  const grid = "grid grid-cols-3 gap4"

  const [modalSelection, setModalSelection] = useState('')
  const { toggleModal } = useContext(ModalContext) as ModalContextType

  const { expenses } = useContext(ExpensesContext) as ExpensesContextType

  return (
    <>
      <div className="bg-white rounded-xl p-4 mt-5 shadow-xl">
        <h5 className="font-semibold opacity-60 mb-2">
          Despesas
          <Button
            text="Novo"
            onClick={() => {
              setModalSelection("new")
              toggleModal()
            }}
          />
        </h5>

        <div className={`${grid} opacity-60 text-sm`}>
          <span>Nome</span>
          <span className="text-right">Valor base</span>
        </div>
        <hr className="mt-4 mb-2" />

        <div className="max-h-96 overflow-y-scroll">
          {expenses.map(e => (
            <div key={e.id}>
              <div className={`${grid} opacity-80 text-sm`}>
                <span>{e.name}</span>
                <span className="text-right">{formatCurrency(e.baseAmount)}</span>
              </div>

              <hr className="my-2" />
            </div>
          ))}
        </div>
      </div>

      {modalSelection == 'new' && <ModalNewExpense />}
    </>
  )
}
