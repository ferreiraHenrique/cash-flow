import MainLayout from "@/components/MainLayout";
import { GetServerSidePropsContext } from "next";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import YearList from "@/components/YearList";
import ModalProvider from "@/contexts/ModalContext";
import YearsProvider from "@/contexts/YearContext";


export default function PeriodosPage() {
  return (
    <MainLayout>
      <div className="w-full p-6">
        <YearsProvider>
          <ModalProvider>
            <YearList />
          </ModalProvider>
        </YearsProvider>
      </div>
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
