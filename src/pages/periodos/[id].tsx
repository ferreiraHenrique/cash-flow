import MainLayout from "@/components/MainLayout";
import { GetServerSidePropsContext } from "next";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import MonthList from "@/components/MonthList";
import ModalProvider from "@/contexts/ModalContext";
import YearsProvider from "@/contexts/YearContext";
import { useRouter } from "next/router";


export default function PeriodoDetalhesPage() {
  const router = useRouter()
  const {id: yearId} = router.query

  if (typeof yearId != 'string') return <></>

  return (
    <MainLayout>
      <YearsProvider id={yearId}>
        <div className="w-full p-6">
          <ModalProvider>
            <MonthList />
          </ModalProvider>
        </div>
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
