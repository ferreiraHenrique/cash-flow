
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { formatCurrency } from "@/helpers/formatCurrency";
import { YearsContext } from "@/contexts/YearContext";
import { YearsContextType } from "@/types/year";


export default function MonthList() {
  const grid = "grid grid-cols-5 gap-4"

  const {years, isLoading} = useContext(YearsContext) as YearsContextType

  if (isLoading) {
    return <></>
  }

  const currentYear = years[0]

  return (
    <>
      <div className="bg-white rounded-xl py-4 px-4 mt-5 shadow-xl">
        <h5 className="font-semibold opacity-60 mb-2">
          Meses {currentYear.name}
        </h5>

        <div className={`${grid} opacity-60 text-sm`}>
          <span>Nome</span>
          <span className="text-right">Crédito</span>
          <span className="text-right">Débito</span>
          <span className="text-right">Saldo</span>
        </div>
        <hr className="mt-4 mb-2" />

        <div className="max-h-96 overflow-y-scroll">
          {currentYear.months.map(m => (
            <>
              <li className={`${grid} opacity-80 text-sm`}>
                <span>{m.name}</span>
                <span className="text-right">{formatCurrency(m.calcTotalCredit())}</span>
                <span className="text-right">{formatCurrency(m.calcTotalDebit())}</span>
                <span className="text-right">{formatCurrency(m.calcTotalCredit() - m.calcTotalDebit())}</span>
                <div className="flex justify-center gap-4">
                  <a
                    className="opacity-60 hover:opacity-80 transition-all ease-in duration-250"
                    href={`/periodos/meses/${currentYear.id}/${m.id}`}
                  >
                    <FontAwesomeIcon icon={faShare} />
                  </a>
                </div>
              </li>
              <hr className="my-2" />
            </>
          ))}
        </div>
      </div>
    </>
  )
}
