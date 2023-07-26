'use client'

import { MonthsContext } from "@/contexts/MonthContext"
import { formatCurrency } from "@/helpers/formatCurrency"
import { IMonth, MonthsContextType } from "@/types/month"
import { useContext } from "react"

interface MonthResumeCardProps {
  month: IMonth
  onClick?: (month: IMonth) => void
}

export default function MonthResumeCard(props: MonthResumeCardProps) {
  const { monthSelected } = useContext(MonthsContext) as MonthsContextType

  console.log(props.month)

  let selectionClasses = "transition-opacity ease-in-out duration-300 opacity-80 hover:opacity-100"
  if (monthSelected && monthSelected.id == props.month.id) {
    selectionClasses = "opacity-100"
  }

  return (
    <div
      onClick={() => props.onClick ? props.onClick(props.month) : ''}
    >
      <div className={`h-36 bg-white w-full max-w-full py-4 px-4 mb-6 rounded-xl shadow-xl cursor-pointer ${selectionClasses}`}>
        <h5 className="mb-0 font-sans text-sm font-semibold leading-normal uppercase opacity-40">
          {props.month.name}
        </h5>
        <p className="mb-2 text-lg font-bold opacity-60">
          {formatCurrency(props.month.calcTotalCredit() - props.month.calcTotalDebit())}
        </p>
        <p className="mb-0 opacity-60">
          <span className="text-sm font-bold leading-normal text-emerald-500">+  {formatCurrency(props.month.calcTotalCredit())}</span>
        </p>
        <p className="mb-0 opacity-60">
          <span className="text-sm font-bold leading-normal text-red-600">- {formatCurrency(props.month.calcTotalDebit())}</span>
        </p>
      </div>
    </div>
  )
}
