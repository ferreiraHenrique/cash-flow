import MainLayout from "@/components/MainLayout";
import { GetServerSidePropsContext } from "next";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import CreditCardsProvider from "@/contexts/CreditCardContext";
import ModalProvider from "@/contexts/ModalContext";
import PurchaseList from "@/components/PurchaseList";


export default function CartaoDetalhesPage() {
  const router = useRouter()
  const { id: cardId } = router.query

  if (typeof cardId != 'string') return <></>

  return (
    <MainLayout>
      <CreditCardsProvider id={cardId}>
        <div className="w-full p-6">
          <ModalProvider>
            <PurchaseList />
          </ModalProvider>
        </div>
      </CreditCardsProvider>
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
