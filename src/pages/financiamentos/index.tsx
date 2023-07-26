import MainLayout from "@/components/MainLayout";
import { GetServerSidePropsContext } from "next";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import FinancingsProvider from "@/contexts/FinancingContext";
import ModalProvider from "@/contexts/ModalContext";
import FinancingList from "@/components/FinancingList";


export default function FinanciamentosPage() {
  return (
    <MainLayout>
      <div className="w-full p-6">
        <FinancingsProvider>
          <ModalProvider>
            <FinancingList />
          </ModalProvider>
        </FinancingsProvider>
      </div>
    </MainLayout>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions)
  if (!session) {
    return { redirect: { destination: '/signin' } }
  }

  return {
    props: { session }
  }
}
