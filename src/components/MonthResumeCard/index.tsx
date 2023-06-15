'use client'

import { formatCurrency } from "@/helpers/formatCurrency"
import { IMonth } from "@/types/month"
import { styled } from "styled-components"

const MonthBalance = styled.p`
`

interface MonthResumeCardProps {
  month: IMonth
  onClick?: (month: IMonth) => void
}

export default function MonthResumeCard(props: MonthResumeCardProps) {
  return (
    <div
      onClick={() => props.onClick? props.onClick(props.month) : ''}
    >
      <div className="bg-white w-full max-w-full py-4 px-4 mb-6 rounded-xl shadow-xl">
        <h5 className="mb-0 font-sans text-sm font-semibold leading-normal uppercase opacity-40">
          {props.month.name}
        </h5>
        <MonthBalance className="mb-2 text-lg font-bold opacity-60">
          {formatCurrency(props.month.calcTotalCredit() - props.month.calcTotalDebit())}
        </MonthBalance>
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
