import { useContext } from "react";
import MonthResumeCard from "../MonthResumeCard";
import { MonthsContext } from "@/contexts/MonthContext";
import { MonthsContextType } from "@/types/month";


export default function MonthListResumeCard() {
  const {months, selectMonth} = useContext(MonthsContext) as MonthsContextType

  return (
    <>
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
