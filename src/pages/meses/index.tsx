import MainLayout from "@/components/MainLayout";
import MonthList from "@/components/MonthList";
import ModalProvider from "@/contexts/ModalContext";
import MonthsProvider from "@/contexts/MonthContext";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";


export default function MesesPage() {
  return (
    <MainLayout>
      <div className='w-full px-6 py-6 mx-2'>
        <MonthsProvider>
          <ModalProvider>
            <MonthList />
          </ModalProvider>
        </MonthsProvider>
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
