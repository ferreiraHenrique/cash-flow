import { GetServerSidePropsContext } from "next"
import { authOptions } from "../api/auth/[...nextauth]"
import { getServerSession } from "next-auth"
import { useRouter } from "next/router"
import MainLayout from "@/components/MainLayout"
import FinancingsProvider from "@/contexts/FinancingContext"
import FinancingInstallmentList from "@/components/FinancingInstallmentList"
import ModalProvider from "@/contexts/ModalContext"


export default function FinanciamentoDetalhesPage() {
  const router = useRouter()
  const { id: financingId } = router.query

  if (typeof financingId != 'string') return <></>

  return (
    <MainLayout>
      <FinancingsProvider id={financingId}>
        <div className="w-full p-6">
          <ModalProvider>
            <FinancingInstallmentList />
          </ModalProvider>
        </div>
      </FinancingsProvider>
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
