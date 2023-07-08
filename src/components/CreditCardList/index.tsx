import { faEdit, faShare, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { ModalContext } from "@/contexts/ModalContext";
import { ModalContextType } from "@/types/modal";
import { CreditCardsContext } from "@/contexts/CreditCardContext";
import { CreditCardsContextType } from "@/types/creditCard";
import ModalNewCreditCard from "../ModalCreditCard/new";


export default function CreditCardList() {
  const grid = "grid grid-cols-3 gap-4"

  const [modalSelection, setModalSelection] = useState('')

  const { toggleModal } = useContext(ModalContext) as ModalContextType
  const { creditCards } = useContext(CreditCardsContext) as CreditCardsContextType

  return (
    <>
      <div className="bg-white rounded-xl p-4 mt-5 shadow-xl">
        <h5 className="font-semibold opacity-60 mb-2">
          Cartões de crédito
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
          <span>Final</span>
        </div>
        <hr className="mt-4 mb-2" />

        <div className="max-h-52 overflow-y-scroll">
          {creditCards.map(c => (
            <>
              <div
                key={`year-li-${c.id}`}
                className={`${grid} opacity-80 text-sm`}
              >
                <span>{c.name}</span>
                <span>{c.lastNumbers}</span>
                <div className="flex justify-center gap-4">
                  <a
                    className="opacity-60 hover:opacity-80 transition-all ease-in duration-250"
                    href={`/periodos/${c.id}`}
                  >
                    <FontAwesomeIcon icon={faShare} />
                  </a>
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
              <hr
                key={`year-hr-${c.id}`}
                className="my-2"
              />
            </>
          ))}
        </div>
      </div>

      {modalSelection == 'new' && <ModalNewCreditCard />}
    </>
  )
}
