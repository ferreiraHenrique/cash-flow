import { FinancingsContext } from "@/contexts/FinancingContext"
import { FinancingsContextType } from "@/types/financing"
import { useContext } from "react"
import NotFound from "../NotFound"
import Button from "../Button"
import { ModalContext } from "@/contexts/ModalContext"
import { ModalContextType } from "@/types/modal"
import ModalNewFinancing from "../ModalFinancing/new"
import { formatDate } from "@/helpers/formatDate"
import { formatCurrency } from "@/helpers/formatCurrency"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShare } from "@fortawesome/free-solid-svg-icons"


export default function FinancingList() {
  const grid = "grid grid-cols-5 gap-4"

  const { financings } = useContext(FinancingsContext) as FinancingsContextType
  const { toggleModal } = useContext(ModalContext) as ModalContextType

  return (
    <>
      <div className="bg-white rounded-xl p-4 mt-4 shadow-xl">
        <h5 className="font-semibold opacity-60 mb-2">
          Financimentos
          <Button
            text="Novo financiamento"
            onClick={() => {
              toggleModal()
            }}
          />
        </h5>

        {!financings.length &&
          <div className="mt-10 grid text-center justify-center">
            <h2 className="opacity-40"><i>Sem financimentos cadastrados</i></h2>
            <NotFound />
          </div>
        }

        {financings.length > 0 &&
          <>
            <div className={`${grid} opacity-60 text-sm`}>
              <span>Nome</span>
              <span className="text-right">Primeira parcela</span>
              <span className="text-right">Valor</span>
              <span className="text-right">N. parcelas</span>
            </div>
            <hr className="mt-4 mb-2" />
          </>
        }

        <div className="max-h-52 overflow-y-scroll">
          {financings.map(f => (
            <>
              <div
                key={`financing-li-${f.id}`}
                className={`${grid} opacity-80 text-sm`}
              >
                <span>{f.name}</span>
                <span className="text-right">{formatDate(f.firstDueDate)}</span>
                <span className="text-right">{formatCurrency(f.amount)}</span>
                <span className="text-right">{f.numberOfInstallments}</span>
                <div className="flex justify-center gap-4">
                  <a
                    className="opacity-60 hover:opacity-80 transition-all ease-in duration-250"
                    href={`/financiamentos/${f.id}`}
                  >
                    <FontAwesomeIcon icon={faShare} />
                  </a>
                </div>
              </div>
              <hr className="my-2" />
            </>
          ))}
        </div>
      </div>

      <ModalNewFinancing />
    </>
  )
}
