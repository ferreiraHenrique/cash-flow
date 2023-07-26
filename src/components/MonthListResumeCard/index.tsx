import { useContext, useEffect, useState } from "react";
import MonthResumeCard from "../MonthResumeCard";
import { MonthsContext } from "@/contexts/MonthContext";
import { IMonth, MonthsContextType } from "@/types/month";
import MonthResumeCardSkeleton from "../MonthResumeCard/skeleton";
import { YearsContext } from "@/contexts/YearContext";
import { YearsContextType } from "@/types/year";


export default function MonthListResumeCard() {
  const { selectMonth } = useContext(MonthsContext) as MonthsContextType
  const { years, isLoading } = useContext(YearsContext) as YearsContextType

  const filterMonths = (m: IMonth) => {
    const today = new Date()

    return (
      m.startAt.getMonth() >= today.getMonth() - 1 &&
      m.startAt.getMonth() <= today.getMonth() + 2
    )
  }

  useEffect(() => {
    if (!years.length) return

    const today = new Date()
    const currentMonth = years[0].months.filter((m) => {
      return m.startAt.getMonth() == today.getMonth()
    })
    selectMonth(currentMonth[0])
  }, [isLoading])

  return (
    <>
      {
        isLoading && (
          <>
            <MonthResumeCardSkeleton />
            <MonthResumeCardSkeleton />
            <MonthResumeCardSkeleton />
          </>
        )
      }
      {!isLoading && years.length > 0 && years[0].months.filter(filterMonths).map(m => (
        <MonthResumeCard
          key={m.id}
          month={m}
          onClick={() => selectMonth(m)}
        />
      ))}
    </>
  )
}
