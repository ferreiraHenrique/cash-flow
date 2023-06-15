import { styled } from "styled-components";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import ModalNewMonth from "../ModalMonth/new";
import { useContext, useState } from "react";
import { ModalContext } from "@/contexts/ModalContext";
import { ModalContextType } from "@/types/modal";
import { MonthsContext } from "@/contexts/MonthContext";
import { MonthsContextType } from "@/types/month";
import ModalUpdateMonth from "../ModalMonth/update";
import { formatCurrency } from "@/helpers/formatCurrency";


const ItemsList = styled.ul`
  max-height: 200px;
  overflow-y: scroll;
`


export default function MonthList() {
  const grid = "grid grid-cols-5 gap-4"

  const [modalSelection, setModalSelection] = useState('')

  const {toggleModal} = useContext(ModalContext) as ModalContextType
  const {months, monthSelected, selectMonth, removeMonth} = useContext(MonthsContext) as MonthsContextType

  return (
    <>
      <div className="bg-white rounded-xl py-4 px-4 mt-5 shadow-xl">
        <h5 className="font-semibold opacity-60 mb-2">
          Meses
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
          <span>Crédito</span>
          <span>Débito</span>
          <span>Saldo</span>
        </div>
        <hr className="mt-4 mb-2" />

        <ItemsList>
          {months.map(m => (
            <>
              <li className={`${grid} opacity-80 text-sm`}>
                <span>{m.name}</span>
                <span>{formatCurrency(m.calcTotalCredit())}</span>
                <span>{formatCurrency(m.calcTotalDebit())}</span>
                <span>{formatCurrency(m.calcTotalCredit() - m.calcTotalDebit())}</span>
                <div className="flex justify-center gap-4">
                  <a
                    className="opacity-60 hover:opacity-80 transition-all ease-in duration-250"
                    onClick={() => {
                      selectMonth(m)
                      setModalSelection('update')
                      toggleModal()
                    }}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </a>
                  <a
                    className="opacity-60 hover:opacity-80 transition-all ease-in duration-250"
                    onClick={() => {
                      selectMonth(m)
                      removeMonth()
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </a>
                </div>
              </li>
              <hr className="my-2" />
            </>
          ))}
        </ItemsList>
      </div>

      {modalSelection == 'new' && <ModalNewMonth />}
      {modalSelection == 'update' && monthSelected && <ModalUpdateMonth />}
    </>
  )
}
