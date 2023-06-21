import { useContext } from "react";
import MonthResumeCard from "../MonthResumeCard";
import { MonthsContext } from "@/contexts/MonthContext";
import { MonthsContextType } from "@/types/month";
import MonthResumeCardSkeleton from "../MonthResumeCard/skeleton";


export default function MonthListResumeCard() {
  const {months, isLoading, selectMonth} = useContext(MonthsContext) as MonthsContextType

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
      {months.map(m => (
        <MonthResumeCard
          key={m.id}
          month={m}
          onClick={selectMonth}
        />
      ))}
    </>
  )
}
