import { useContext, useState } from "react"
import Button from "../Button"
import { ModalContextType } from "@/types/modal"
import { ModalContext } from "@/contexts/ModalContext"
import { ExpensesContext } from "@/contexts/ExpenseContext"
import { ExpensesContextType, IExpense } from "@/types/expense"
import ModalNewExpense from "../ModalExpense/new"
import { formatCurrency } from "@/helpers/formatCurrency"
import { formatDate } from "@/helpers/formatDate"
import NotFound from "../NotFound"


export default function ExpenseList() {
  const grid = "grid grid-cols-4 gap-4"
  const isActiveClass = "border-primary bg-primary"
  const isInactiveClass = "border-slate-700 bg-slate-700"

  const [modalSelection, setModalSelection] = useState('')
  const { toggleModal } = useContext(ModalContext) as ModalContextType

  const { expenses, updateExpense } = useContext(ExpensesContext) as ExpensesContextType

  const handleUpdate = (expense: IExpense) => {
    expense.isActive = !expense.isActive
    updateExpense(expense)
  }

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

        {!expenses.length &&
          <div className="mt-10 grid text-center justify-center">
            <h2 className="opacity-40"><i>Sem despesas cadastradas</i></h2>
            <NotFound />
          </div>
        }

        {expenses.length > 0 &&
          <>
            <div className={`${grid} opacity-60 text-sm`}>
              <span>Nome</span>
              <span className="text-right">Valor base</span>
              <span className="text-right">Início</span>
              <span className="text-right">Status</span>
            </div>
            <hr className="mt-4 mb-2" />
          </>
        }

        <div className="max-h-96 overflow-y-scroll">
          {expenses.map(e => (
            <div key={e.id}>
              <div className={`${grid} opacity-80 text-sm items-center`}>
                <span>{e.name}</span>
                <span className="text-right">{formatCurrency(e.baseAmount)}</span>
                <span className="text-right">{formatDate(e.startAt)}</span>
                <div className="text-right py-1">
                  <span
                    className={`text-xs text-white rounded-xl border border-solid ${e.isActive ? isActiveClass : isInactiveClass} py-1 px-3 cursor-pointer`}
                    onClick={() => handleUpdate(e)}
                  >{e.isActive ? 'Ativo' : 'Não ativo'}</span>
                </div>
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
