import { faEdit, faShare, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { ModalContext } from "@/contexts/ModalContext";
import { ModalContextType } from "@/types/modal";
import ModalNewYear from "../ModalYear/new";
import { YearsContext } from "@/contexts/YearContext";
import { YearsContextType } from "@/types/year";


export default function YearList() {
  const grid = "grid grid-cols-2 gap-4"

  const [modalSelection, setModalSelection] = useState('')

  const {toggleModal} = useContext(ModalContext) as ModalContextType
  const {years} = useContext(YearsContext) as YearsContextType

  return (
    <>
      <div className="bg-white rounded-xl p-4 mt-5 shadow-xl">
        <h5 className="font-semibold opacity-60 mb-2">
          Períodos
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
        </div>
        <hr className="mt-4 mb-2" />

        <div className="max-h-52 overflow-y-scroll">
          {years.map(y => (
            <>
              <div
                key={`year-li-${y.id}`}
                className={`${grid} opacity-80 text-sm`}
              >
                <span>2023</span>
                <div className="flex justify-center gap-4">
                  <a
                    className="opacity-60 hover:opacity-80 transition-all ease-in duration-250"
                    href={`/periodos/${y.id}`}
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
                key={`year-hr-${y.id}`}
                className="my-2"
              />
            </>
          ))}
        </div>
      </div>

      {modalSelection == 'new' && <ModalNewYear />}
    </>
  )
}
