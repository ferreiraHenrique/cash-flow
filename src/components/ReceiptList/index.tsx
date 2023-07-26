import { useContext, useState } from "react"
import Button from "../Button"
import { ModalContext } from "@/contexts/ModalContext"
import { ModalContextType } from "@/types/modal"
import ModalNewReceipt from "../ModalReceipt/new"
import { ReceiptsContext } from "@/contexts/ReceiptContext"
import { IReceipt, ReceiptsContextType } from "@/types/receipt"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import { formatCurrency } from "@/helpers/formatCurrency"
import { formatDate } from "@/helpers/formatDate"


export default function ReceiptList() {
  const grid = "grid grid-cols-4 gap-4"
  const isActiveClass = "border-primary bg-primary"
  const isInactiveClass = "border-slate-700 bg-slate-700"

  const [modalSelection, setModalSelection] = useState('')

  const { toggleModal } = useContext(ModalContext) as ModalContextType
  const { receipts, updateReceipt } = useContext(ReceiptsContext) as ReceiptsContextType

  const handleUpdate = (receipt: IReceipt) => {
    receipt.isActive = !receipt.isActive
    updateReceipt(receipt)
  }

  return (
    <>
      <div className="bg-white rounded-xl p-4 mt-5 shadow-xl">
        <h5 className="font-semibold opacity-60 mb-2">
          Receitas
          <Button
            text="Novo"
            onClick={() => {
              setModalSelection('new')
              toggleModal()
            }}
          />
        </h5>

        <div className={`${grid} opacity-60 text-sm`}>
          <span>Nome</span>
          <span className="text-right">Valor base</span>
          <span className="text-right">Início</span>
          <span className="text-right">Status</span>
        </div>
        <hr className="mt-4 mb-2" />

        <div className="max-h-96 overflow-y-scroll">
          {receipts.map(r => (
            <div key={r.id}>
              <div className={`${grid} opacity-80 text-sm items-center`}>
                <span>{r.name}</span>
                <span className="text-right">{formatCurrency(r.baseAmount)}</span>
                <span className="text-right">{formatDate(r.startAt)}</span>
                <div className="text-right py-1">
                  <span
                    className={`text-xs text-white rounded-xl border border-solid ${r.isActive ? isActiveClass : isInactiveClass} py-1 px-3 cursor-pointer`}
                    onClick={() => handleUpdate(r)}
                  >{r.isActive ? 'Ativo' : 'Não ativo'}</span>
                </div>
              </div>

              <hr className="my-2" />
            </div>
          ))}
        </div>
      </div>

      {modalSelection == "new" && <ModalNewReceipt />}
    </>
  )
}
