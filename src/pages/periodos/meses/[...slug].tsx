import MainLayout from "@/components/MainLayout";
import MonthResumeCard from "@/components/MonthResumeCard";
import MonthResumeCardSkeleton from "@/components/MonthResumeCard/skeleton";
import TransactionList from "@/components/TransactionList";
import ModalProvider from "@/contexts/ModalContext";
import MonthsProvider, { MonthsContext } from "@/contexts/MonthContext";
import YearsProvider, { YearsContext } from "@/contexts/YearContext";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { IMonth, MonthsContextType } from "@/types/month";
import { YearsContextType } from "@/types/year";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";


interface ResumeCardProps {
  monthId: string
}

export function ResumeCard(props: ResumeCardProps) {
  const router = useRouter()

  const {years, isLoading} = useContext(YearsContext) as YearsContextType
  const {selectMonth} = useContext(MonthsContext) as MonthsContextType

  if (isLoading) return <MonthResumeCardSkeleton />

  const currentYear = years[0]

  const index = currentYear.months.findIndex(m => m.id == props.monthId)
  const filterMonths = (m: IMonth, i: number) => (i >= index-1 && i <= index+2)

  useEffect(() => {
    if (!years.length) return

    const currentMonth = currentYear.months.filter((m) => m.id == props.monthId)
    selectMonth(currentMonth[0])
  }, [isLoading])

  return (
    <>
      {currentYear.months.filter(filterMonths).map(m => (
        <MonthResumeCard
          key={m.id}
          month={m}
          onClick={() => {
            props.monthId == m.id
            selectMonth(m)
            router.push(`/periodos/meses/${currentYear.id}/${m.id}`)
          }}
        />
      ))}
    </>
  )
}

export default function PeriodosMesesDetalhesPage() {
  const router = useRouter()
  const {slug} = router.query

  if (typeof slug != 'object') return <></>
  const [yearId, monthId] = slug

  return (
    <MainLayout>
      <YearsProvider id={yearId}>
        <MonthsProvider notFetchAll={true}>
          <div className="w-full p-6">
            <div className="grid grid-cols-4 gap-6">
              <ResumeCard monthId={monthId} />
            </div>

            <ModalProvider>
              <TransactionList />
            </ModalProvider>
          </div>
        </MonthsProvider>
      </YearsProvider>
    </MainLayout>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions)
  if (!session) {
    return {redirect: {destination: '/signin'}}
  }

  return {
    props: {session}
  }
}

