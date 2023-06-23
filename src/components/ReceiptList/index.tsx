import { useContext, useState } from "react"
import Button from "../Button"
import { ModalContext } from "@/contexts/ModalContext"
import { ModalContextType } from "@/types/modal"
import ModalNewReceipt from "../ModalReceipt/new"
import { ReceiptsContext } from "@/contexts/ReceiptContext"
import { ReceiptsContextType } from "@/types/receipts"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import { formatCurrency } from "@/helpers/formatCurrency"


export default function ReceiptList() {
  const grid = "grid grid-cols-3 gap4"

  const [modalSelection, setModalSelection] = useState('')

  const {toggleModal} = useContext(ModalContext) as ModalContextType
  const {receipts} = useContext(ReceiptsContext) as ReceiptsContextType

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
        </div>
        <hr className="mt-4 mb-2" />

        <div className="max-h-96 overflow-y-scroll">
          {receipts.map(r => (
            <div key={r.id}>
              <div className={`${grid} opacity-80 text-sm`}>
                <span>{r.name}</span>
                <span className="text-right">{formatCurrency(r.baseAmount)}</span>
                <div className="flex justify-center gap-4">
                  <a
                    className="opacity-60 hover:opacity-80 transition-all ease-in duration-250"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </a>
                  <a
                    className="opacity-60 hover:opacity-80 transition-all ease-in duration-250"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </a>
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
